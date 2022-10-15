export type Clock = {
  backgroundImage?: {
    secure_url: string
  };
  backgroundColour?: {
    hex: string;
  }
  event: string;
  id: string;
  startTime: string;
};

type Colours = {
  r: string
  g: string
  b: string
}
type ClockList = {
  clocks: Clock[];
  name: string;
  backgroundColours: Colours[]
}

export type ClocksData = {
  data: {
    clockLists: ClockList[]
    
  }
}