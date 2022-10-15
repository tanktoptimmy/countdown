import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ClocksData } from "../types";

export default function useClocks() {
  return useQuery(["clocks"], async (): Promise<ClocksData> => {
    const { data } = await axios.post(
      "https://api-eu-west-2.hygraph.com/v2/cl8ylq0kw0atc01tc0dl4cqub/master",
      {
        query:`query Clocks {
          clocks {
            backgroundImage
            backgroundColour {
              hex
              rgba {
                a
                b
                g
                r
              }
              css
            }
            createdAt
            event
            id
            publishedAt
            startTime
            updatedAt
          }
        }`}
    );
    return data;
  });
}