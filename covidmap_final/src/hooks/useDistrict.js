import { useDate } from "./useDate";
import { useJsonData } from "./useJsonData";

export function useDistrict(district) {
  const covidData = useJsonData();
  const dates = useDate().sort((a, b) => a.getTime() - b.getTime())
  
  const finalLists = [];
  dates.map((date) => {

    const obj = {};
    const date2 = `${date.getMonth() + 1}月${date.getDate() }日`;
    obj["date"] = `${date.getDate() }/${date.getMonth() + 1}`;
    
    covidData.map((item) => {
      if (item.date === date2) {
        Object.keys(item.value).map((loc) => {
          if (loc === district) {
            const details = item.value[loc];
            obj["cases"] = details?.cases || 0;
            obj["symptom"] = details?.asymptomaticCases || 0;
          }
        });
      }
    });
    finalLists.push(obj);
  });


  return finalLists;
}
