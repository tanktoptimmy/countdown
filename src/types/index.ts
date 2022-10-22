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
  rgba: {
    r: number
    g: number
    b: number
    a: number
  }
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