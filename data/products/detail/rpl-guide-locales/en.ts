import type { RplGuideParameters, RplGuideText } from "./types";

export function getEnglishRplGuide(p: RplGuideParameters): RplGuideText {
  const motor = `${p.rinse ? "six-wire" : "four-wire"}, 1.5 A/phase, 1.8° full step`;
  return {
    productType: "Valveless metering pump",
    lead: `${p.model} draws in and discharges liquid through the combined rotation and reciprocation of a ceramic piston. Define the target dose, available dispensing time, process liquid and cleaning liquid before selecting displacement, speed and tubing. Measure delivered volume at the actual outlet.`,
    features: [
      ["Set displacement and speed separately", `${p.range} μL/rev is the displacement range per revolution. Mechanical adjustment changes delivery per revolution; speed changes the time taken to complete those revolutions.`],
      ["Ceramic piston and cylinder set", `The configuration shown combines a PVDF pump head with ${p.ceramic}. Check the liquid compatibility of every wetted component.`],
      ["Mount for effective air removal", "Pump-head orientation, flow direction and motor position affect air removal and protection against leaks. Allow space for head adjustment and tubing."],
      [p.rinse ? "Separate process and rinse circuits" : "Cleaning through the process circuit", p.rinse ? "Process ports carry the reagent; rinse ports flush the piston area. Identical threads do not make these ports interchangeable." : "Displace residual liquid through the process circuit. For salt-containing or crystallizing liquids, define the cleaning liquid, flushing volume and shutdown procedure together."],
    ],
    documents: [
      ["Model and displacement", `${p.model}: ${p.range} μL/rev. Specify the displacement setting, drive and position-feedback configuration when ordering.`],
      ["Ports and wetted materials", `Process ports: ${p.port}; PVDF pump head and ${p.ceramic}. ${p.rinse ? "Rinse ports: 1/4-28 UNF-2B." : "This configuration has no separate RINSE ports."}`],
      ["Performance test conditions", `Test conditions: pure water, ${p.testRpm} rpm, fluid-circuit pressure ≤50 kPa and forward motor rotation. Assess accuracy, repeatability and service life in relation to these conditions.`],
      ["Integration checks", "Confirm mounting orientation, head adjustment clearance, motor windings, optical-sensor interface and the supplied wiring version before commissioning the drive and fluid circuit."],
    ],
    sections: {
      principle: {
        title: "How the piston draws in and discharges liquid",
        intro: "The ceramic piston rotates and reciprocates axially at the same time. Rotation connects the flat-sided passage on the piston alternately to the inlet and outlet; reciprocation changes the pumping-chamber volume. A complete cycle comprises intake, intake complete, discharge and discharge complete.",
      },
      displacement: {
        title: "Selecting displacement, speed and dispensing cycle time",
        intro: `Mechanical adjustment sets displacement per revolution, complete revolutions determine the nominal dose, and speed affects delivery time. The ${p.range} μL/rev range of ${p.model} is neither a flow rate per minute nor a guaranteed minimum reliable dose.`,
        rows: [
          ["Discrete dispensing", "Nominal dose = displacement × complete revolutions", "Select a displacement suitable for the dose, then check start/stop effects, residual outlet drops and the first dose after a pause. Validate partial-revolution delivery separately."],
          ["Continuous supply", "Nominal average flow = displacement × rpm", "Multiplying μL/rev by rev/min gives μL/min. Supply conditions, backpressure and liquid properties also affect actual flow. Average flow does not imply pulse-free delivery."],
          ["Delivery time", "Confirm permitted speed for the model and drive", "Check speed with the selected drive and operating conditions. The instrument cycle also includes container indexing, needle movement and settling time."],
          ["Pressure and accuracy", "Distinguish pressure rating, test backpressure and operating point", `The 150 kPa pressure rating does not establish validated continuous operation at that backpressure. Test results at ${p.testRpm} rpm do not apply automatically to every speed.`],
        ],
      },
      materials: {
        title: "Choosing the pump head, ceramic set and cleaning liquid",
        intro: `The configuration shown uses a PVDF pump head with ${p.ceramic}. Material selection must cover the process and cleaning liquids, concentration, temperature and contact time. Ceramic corrosion resistance alone does not establish compatibility of the complete pump.`,
        rows: [
          ["Process liquid", "Record composition, viscosity, particles and crystallization tendency", "For particle-bearing or crystallizing liquids, assess filtration, flushing and shutdown requirements before verifying motion and delivery with a sample."],
          ["Cleaning liquid", p.rinse ? "Design process-circuit cleaning and piston-area rinsing separately" : "Define cleaning through this model’s process circuit", p.rinse ? "The RINSE circuit has no pumping action of its own and needs an external rinse supply. Use a liquid compatible with every wetted material; check for precipitates, bubbles and seal problems after a liquid change." : "Use a compatible cleaning liquid that displaces the residue. After changing liquids, check for precipitates, bubbles and seal problems."],
          ["Shutdown residue", "Prevent salt-containing or crystallizing liquids from drying in the metering set", "Flush out the process liquid before shutdown. Prime and test before restarting; if the piston sticks, stop the drive and contact technical support."],
        ],
      },
      drive: {
        title: "Motor drive, windings and home-position feedback",
        intro: `The motor is ${motor}. Wire the motor and optical sensor separately. Confirm the drive arrangement before checking power and signal connections.`,
        rows: [
          ["Winding connection", motor, p.rinse ? "Full-winding and half-winding connections affect torque and speed. Set drive current using the wiring diagram and the selected driver." : "Black and green form one winding; red and blue form the other. Connect the two phases to the driver; do not use a six-wire connection scheme."],
          ["Optical-sensor supply", "5–24 VDC ±10%", "Check sensor supply, ground, output type and controller input, then verify switching. A position signal is not feedback of each delivered dose."],
          ["Starting and positioning", "Check rotation, home position and stop position", "At low speed, confirm motion and flow direction before setting acceleration, deceleration and cycle count. Isolate power before changing wiring."],
        ],
        note: "Verify wire colors, connectors and current settings against the motor and optical sensor supplied. Do not connect or disconnect their harnesses while powered.",
      },
      installation: {
        title: p.rinse ? "Mounting orientation, process ports and rinse ports" : "Mounting orientation, fixing and process ports",
        intro: "Mount the pump so that air can leave the head and accidental leakage cannot drain toward the motor. Include the height differences between reservoir, pump head and dispensing needle in the fluid-circuit design.",
        rows: [
          ["Process ports", p.port, "Check threads, sealing faces, fittings and tubing. Support the tubing so it does not pull on the pump head."],
          [p.rinse ? "Piston rinse ports" : "Process-circuit cleaning", p.rinse ? "1/4-28 UNF-2B; plugs may be fitted by default" : "Displace residue through the process ports", p.rinse ? "Connect rinse supply and return according to their identification. Do not connect them to reagent inlet or outlet ports. Confirm the rinse liquid and connections before use." : "This configuration has no independent RINSE ports. Plan flushing for the process liquid and do not modify the pump-head ports."],
          ["Mechanical fixing", "Use the model drawing, adjustment angle and mounting orientation", "Leave clearance for fittings, harnesses, displacement adjustment and maintenance. Recheck head orientation and tubing loads after fixing the pump."],
        ],
      },
      commissioning: {
        title: "First use and delivered-volume verification",
        intro: p.rinse ? "Check the start/stop positions of the piston and optical-sensor flag before priming. The illustration assumes clockwise rotation viewed from the motor front. For reverse rotation, the inlet, piston flat and flag positions are reversed." : "Establish stable, air-free priming before adjusting dose settings. Do not compensate for unstable, bubble-affected delivery by changing displacement.",
        steps: [
          ["Check with power isolated", "Confirm model, displacement setting, motor windings and sensor wiring, and identify the process and rinse circuits."],
          ["Prime and remove air", "Use a compatible liquid and run slowly. Check for bubbles and leaks from reservoir to head and outlet, and confirm the intended flow direction."],
          ["Fix test conditions", p.rinse ? "Keep displacement, speed, backpressure, needle and tubing constant. Run one complete revolution per measurement and record delivered mass 10 times." : "Keep displacement, cycle count, speed, backpressure, needle and tubing constant. Collect repeated deliveries at the same target dose."],
          ["Test first and continuous doses separately", "Record the first delivery after a pause, repeated deliveries and residual drops. Correct settings from the measurements; repeat verification after changing liquids or tubing."],
        ],
        note: "For gravimetric measurement, convert mass to volume using the liquid’s actual density at the test temperature. Record the method and each result.",
      },
      care: {
        title: "Routine care, shutdown and troubleshooting",
        intro: "First distinguish supply, motion and outlet problems, then investigate them one at a time. Contact technical support before disassembly or work on the metering set.",
        rows: [
          ["No delivery or recurring bubbles", "Liquid level, inlet sealing, flow direction and orientation", "Rule out air ingress, an empty reservoir and kinked tubing before priming again. Do not simply increase speed."],
          ["Stable repeated doses but an incorrect first dose", "Retraction during pauses, tip drops and start/stop position", "Record pause duration and the first dose separately. Adjust the stopping and motion sequence in the complete circuit."],
          ["Flow decreases over time", "Crystals, inlet resistance, blocked fittings and drive settings", "Stop and follow a compatible cleaning procedure. Check tubing and filters; never force a sticking piston to rotate."],
          ["Leaks or unusual noise", "Fitting loads, seals and mechanical fixing", "Stop operation. Keep photos and records of the liquid and drive settings, then contact technical support."],
        ],
      },
    },
    figures: {
      cycle: { alt: "Four-stage RPL valveless metering cycle: intake, intake complete, discharge and discharge complete", caption: "1 Intake → 2 Intake complete → 3 Discharge → 4 Discharge complete." },
      components: { alt: `${p.model} pump components with numbered adjustment, port, sensor and mounting references`, caption: p.rinse ? "1 Adjustment knob · 2 Scale · 3 Rinse port · 4 Process port · 5 Pump head · 6 Optical sensor · 7 Mounting bracket · 8 Electrical connector." : "1 Adjustment knob · 2 Scale · 3 Pump head · 4 Process port · 5 Optical sensor · 6 Mounting bracket · 7 Electrical connector." },
      adjustment: { alt: `${p.model} four-step mechanical displacement adjustment`, caption: "1 Loosen the locking screw → 2 Read the scale → 3 Adjust and verify by weighing → 4 Retighten the locking screw." },
      motor4: { alt: "RPL-P4 four-wire motor winding diagram: black–green and red–blue pairs", caption: "Four-wire motor: black–green is one winding; red–blue is the other." },
      motor6: { alt: "RPL six-wire motor connector pin numbering and phase winding diagram", caption: "Six-wire motor: connector numbering and phase windings. RED, BLK, YEL, BLU, WHT and ORG identify red, black, yellow, blue, white and orange wires." },
      optical: { alt: "RPL optical sensor: numbered supply, ground, output and load connections", caption: "1 Brown: supply · 2 Black: output 1, light-ON · 3 White: output 2, dark-ON · 4 Blue: 0 V · 5 Load. Insulate unused output wires." },
      installation: { alt: `${p.model} correct and incorrect mounting orientations and liquid-flow arrows`, caption: "Follow the flow arrows, allow air to leave the head and prevent leakage toward the motor. ✓ Correct orientation; ✕ incorrect orientation." },
      position: { alt: "RPL piston flat facing the inlet and optical-sensor flag at the start/stop position", caption: "Start/stop positioning: the piston flat faces the inlet; the optical sensor detects the edge of the flag." },
      measurement: { alt: "RPL gravimetric measurement circuit with reservoir, inlet tubing, pump, outlet tubing, sampling needle and balance", caption: "1 Supply reservoir · 2 Inlet tubing · 3 RPL pump and drive · 4 Outlet tubing · 5 Flat-ended sampling needle · 6 Precision balance · 7 Receiving vessel." },
    },
  };
}
