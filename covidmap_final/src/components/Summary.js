import React, { useState } from "react";
import ModalChart from "./ModalChart";

function Summary({ data,district,setDistrict }) {
  
  let totalCases = 0;
  let totalSymptom = 0;
  
  return (
    <div className="summary__table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Symtomatic</th>
            <th>Asymptomatic</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            Object.keys(data[0].value).map((item, key) => {
              const district_English = {"浦东新区":"Pudong New", "黄浦区":"Huangpu", "静安区":"Jingan", "徐汇区":"Xuhui", "长宁区":"Changning", "普陀区":"Putuo", "虹口区":"Hongkou", "杨浦区":"Yangpu", "宝山区":"Baoshan", "闵行区":"Minghang", "嘉定区":"Jiading", "金山区":"Jingshan", "松江区":"Songjiang", "青浦区":"Qingpu", "奉贤区":"Fengxian", "崇明区":"Chongming"}
              const district = data[0].value[item];
              // console.log(district)
              totalCases += district?.cases || 0
              // console.log(totalCases)
              totalSymptom += district?.asymptomaticCases || 0
              return (
                <tr key={key}>
                  <td><a href="#" onClick={() => setDistrict(district.name)}>{district_English[district.name]}</a></td>
                  <td>{district?.cases}</td>
                  <td>{district?.asymptomaticCases}</td>
                </tr>
              );
            })}
        </tbody>
        <tbody>
          <tr>
            <td>Total</td>
            <td>{totalCases}</td>
            <td>{totalSymptom}</td>
          </tr>
        </tbody>
      </table>
      <ModalChart district={district} setDistrict={setDistrict}/>
    </div>
  );
}

export default Summary;
