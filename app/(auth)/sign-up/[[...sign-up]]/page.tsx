import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className={"mx-auto"}>
      <SignUp />;
    </div>
  );
}
