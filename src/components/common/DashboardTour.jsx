import { useState } from "react";
import { Joyride, STATUS } from "react-joyride";
import { CircleHelp } from "lucide-react";

const steps = [{ target: '[data-tour-id="nav-menu"]', title: "Your workspace", content: "Use these links to move between your dashboard, activity, and account tools.", skipBeacon: true }];
export default function DashboardTour() {
  const [run, setRun] = useState(false);
  return <><button className="text-action" onClick={() => setRun(true)}><CircleHelp size={16}/> Tour</button>
    <Joyride steps={steps} run={run} continuous onEvent={({ status }) => {
      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) setRun(false);
    }}/></>;
}
