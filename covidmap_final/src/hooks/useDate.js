import React from "react";

export function useDate() {
  const regex = /(\d+)月(\d+)日/;

  const importAll = (file) =>
    file.keys().map((item) => {
      const fileName = item.split("/")[1].split(".")[0];
      let day = fileName.split(regex);
    
      return new Date(`${new Date().getFullYear()}-${day[1]}-${day[2]}`);;
    });
  const dates = importAll(require.context("./data/", false, /\.(json)$/)).sort(
    (a, b) => b.getTime() - a.getTime()
  );
  
  return dates;
}
