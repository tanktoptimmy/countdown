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

export type ClocksData = {
  data: {
    clocks:Clock[]
  }
}