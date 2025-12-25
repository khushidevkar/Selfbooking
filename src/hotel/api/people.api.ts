import { coreAxios } from "@/libs/axios";

export const fetchPeopleDetails = (ids: string[]) =>
  coreAxios.post("/hotels/getPeoplewithId", {
    people_ids: ids,
  });

// export const getCompanies = () => 
//     coreAxios.get("/getAllSBTCompanies");
export const getCompanies = <T>() =>
  coreAxios.get<T>("/getAllSBTCompanies");
