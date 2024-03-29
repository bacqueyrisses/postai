// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Kelly from "@amcharts/amcharts5/themes/Kelly";
import { SelectedCityType } from "@/types/global";

interface IRotatingGlobe {
  selectedCity: SelectedCityType;
  userCurrentLocation: SelectedCityType;
}
export default function RotatingGlobe({
  selectedCity,
  userCurrentLocation,
}: IRotatingGlobe) {
  const chartRef = useRef<am5.Chart | null>(null);
  const polygonSeriesRef = useRef<am5map.MapPolygonSeries | null>(null);
  const rootRef = useRef<am5.Root | null>(null);

  function selectCountry(id: string, currentPolygon: any, currentChart: any) {
    let dataItem = currentPolygon.getDataItemById(id);
    let target = dataItem?.get("mapPolygon");
    target?.set("active", true);

    if (!target) return;

    let centroid = target.geoCentroid();
    if (centroid) {
      currentChart.animate({
        key: "rotationX",
        to: -centroid.longitude,
        duration: 1500,
        easing: am5.ease.inOut(am5.ease.cubic),
      });
      currentChart.animate({
        key: "rotationY",
        to: -centroid.latitude,
        duration: 1500,
        easing: am5.ease.inOut(am5.ease.cubic),
      });
    }
  }

  useEffect(() => {
    // Early return if Root ref is set
    if (rootRef.current) return;

    // Create root element
    const root = am5.Root.new("chartdiv", {
      useSafeResolution: false,
    });
    root._logo?.dispose();

    // Set themes
    root.setThemes([am5themes_Animated.new(root), am5themes_Kelly.new(root)]);

    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoOrthographic(),
        maxZoomLevel: 1,
        zoomLevel: 1,
        panX: "none",
        panY: "none",
      }),
    );

    // Create main polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am4geodata_worldLow,
      }),
    );

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover"),
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: am5.color("#047857"),
    });

    // Create series for background fill
    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {}),
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0.05,
      strokeOpacity: 0,
    });
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color("#17A34A"),
      fillOpacity: 1,
    });

    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    // Set up events
    let previousPolygon: am5map.MapPolygon | null;
    polygonSeries.mapPolygons.template.on("active", function (active, target) {
      if (previousPolygon && previousPolygon !== target) {
        previousPolygon.set("active", false);
      }
      if (target?.get("active")) {
        selectCountry(target.dataItem.get("id"), polygonSeries, chart);
      }
      previousPolygon = target;
    });

    // Animate on load
    polygonSeries.events.on("datavalidated", function () {
      selectCountry("US", polygonSeries, chart);
    });
    rootRef.current = root;
    chartRef.current = chart;
    polygonSeriesRef.current = polygonSeries;
  }, []);

  useEffect(() => {
    // Animate on value change
    selectedCity.countryCode &&
      selectCountry(
        selectedCity.countryCode,
        polygonSeriesRef.current,
        chartRef.current,
      );
  }, [selectedCity.countryCode]);

  useEffect(() => {
    // Animate on value change
    userCurrentLocation.countryCode &&
      selectCountry(
        userCurrentLocation.countryCode,
        polygonSeriesRef.current,
        chartRef.current,
      );
  }, [userCurrentLocation.countryCode]);

  return <div id="chartdiv" className={"h-[50rem] w-[50rem]"}></div>;
}
