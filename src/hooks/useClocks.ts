import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ClocksData } from "../types";

export default function useClocks() {
  return useQuery(["clocks"], async (): Promise<ClocksData> => {
    const { data } = await axios.post(
      "https://api-eu-west-2.hygraph.com/v2/cl8ylq0kw0atc01tc0dl4cqub/master",
      {
        query:`query Clocks {clockLists(stage: PUBLISHED) {
          clocks {
            backgroundColour {
              hex
            }
            backgroundImage
            event
            id
            startTime
          }
          id
          name
          backgroundColours {
            rgba {
              b
              g
              r
            }
          }
        }
}`}
    );
    return data;
  });
}