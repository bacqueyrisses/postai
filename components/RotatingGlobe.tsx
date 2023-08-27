// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Kelly from "@amcharts/amcharts5/themes/Kelly";

interface IRotatingGlobe {
  selectedCountry: string;
  userCurrentLocationRef: React.MutableRefObject<string | null>;
}

const RotatingGlobe = ({
  selectedCountry,
  userCurrentLocationRef,
}: IRotatingGlobe) => {
  const chartRef = useRef<am5.Chart | null>(null);
  const polygonSeriesRef = useRef<am5map.MapPolygonSeries | null>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useEffect(() => {
    // Create root element
    const root = am5.Root.new("chartdiv", {
      useSafeResolution: false,
    });
    root._logo?.dispose();

    // Set themes
    root.setThemes([am5themes_Animated.new(root), am5themes_Kelly.new(root)]);
    rootRef.current = root;

    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        maxZoomLevel: 1,
        zoomLevel: 1,
        // panX: "none",
        // panY: "none",
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
      // fill: root.interfaceColors.get("alternativeBackground"),
      fill: am5.color("#047857"),
    });

    // Create series for background fill
    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {}),
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      // fill: am5.color("#0000FF"),
      fillOpacity: 0.05,
      strokeOpacity: 0,
    });
    polygonSeries.mapPolygons.template.setAll({
      // tooltipText: "{name}",
      // fill: root.interfaceColors.get("alternativeBackground"),

      fill: am5.color("#17A34A"),
      fillOpacity: 1,
      toggleKey: "active",
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
        selectCountry(target.dataItem.get("id"));
      }
      previousPolygon = target;
    });

    function selectCountry(id: string) {
      let dataItem = polygonSeries.getDataItemById(id);
      let target = dataItem?.get("mapPolygon");
      target?.set("active", true);

      if (target) {
        let centroid = target.geoCentroid();
        if (centroid) {
          chart.animate({
            key: "rotationX",
            to: -centroid.longitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
          chart.animate({
            key: "rotationY",
            to: -centroid.latitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
        }
      }
    }

    polygonSeries.events.on("datavalidated", function () {
      selectCountry(userCurrentLocationRef || selectedCountry || "US");
    });

    chartRef.current = chart;
    polygonSeriesRef.current = polygonSeries;
  }, []);

  useEffect(() => {
    // Create the map chart
    const chart = chartRef.current;
    const polygonSeries = polygonSeriesRef.current;

    function selectCountry(id: string) {
      let dataItem = polygonSeries.getDataItemById(id);
      let target = dataItem?.get("mapPolygon");
      target.set("active", true);

      if (target) {
        let centroid = target.geoCentroid();
        if (centroid) {
          chart.animate({
            key: "rotationX",
            to: -centroid.longitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
          chart.animate({
            key: "rotationY",
            to: -centroid.latitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
        }
      }
    }

    selectedCountry && selectCountry(selectedCountry);

    // Make stuff animate on load
  }, [selectedCountry]);

  return <div id="chartdiv" className={"w-[50rem] h-[50rem]"}></div>;
};

export default RotatingGlobe;
