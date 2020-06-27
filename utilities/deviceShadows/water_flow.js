// Shadow state:
module.exports  =
{
  "desired": {
    "WaterFlowRate": 0,
    "CurrentUses": 29,
  // (water used till time)
    "Dailylimit": 5,
  // (daily usage limit)
    "valve_status": 1,
  // (Tap Valve status on and off)
    "otajobflag": 0
  },
  "reported": {
    "WaterFlowRate": 0,
    "Dailylimit": 5,
  // (daily usage limit)
    "CurrentUses": 29,
  // (water used till time)
    "valve_status": 1,
  // (Tap Valve status on and off)
    "otajobflag": 0
  }
}

// Fuction from Alexa and Google Home:
// 1: descover each sensor individauly.
// 2: Able to set daily usage limit.
// 3: Able to get water used till time of query in liters.
// 4: close or open the Valve on command.
