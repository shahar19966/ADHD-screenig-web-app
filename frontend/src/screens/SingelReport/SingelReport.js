import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./SingelReport.css";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import MainScreen from "../../components/MainScreen";
import Table from "react-bootstrap/Table";
import buttons from "../../styles/buttons.css";
import { stringify } from "querystring";
import PolarGraph from "./PolarGraph";


export const SingelReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState("");
  const [temp2, setTemp2] = useState([]);
 
  let temp=" "
  const fetching = async () => {
    const { data } = await axios.get(`/api/patients/report/${id}`);
    setReport(data);
    temp = data.DisturbancesMetadata;
    setTemp2((JSON.parse(temp[0])));
  
  };

  const exportToExcel = () => {
    const data = [
      {
        type: "Letters data list",
        SessionWithoutDisturbances: `${report.WithoutlettersDataList}`,
        SessionWithDisturbances: `${report.WithlettersDataList}`,
      },
      {
        type: "Times of should press",
        SessionWithoutDisturbances: `${report.WithoutTimesOfShouldPress}`,
        SessionWithDisturbances: `${report.WithTimesOfShouldPress}`,
      },
      {
        type: "Pressed and should",
        SessionWithoutDisturbances: `${report.WithoutPressedAndshould}`,
        SessionWithDisturbances: `${report.WithPressedAndshould}`,
      },
      {
        type: "Pressed and should not",
        SessionWithoutDisturbances: `${report.WithoutPressedAndshouldNot}`,
        SessionWithDisturbances: `${report.WithPressedAndshouldNot}`,
      },
      {
        type: "Not pressed and should",
        SessionWithoutDisturbances: `${report.WithoutNotPressedAndshould}`,
        SessionWithDisturbances: `${report.WithNotPressedAndshould}`,
      },
      {
        type: "Head rotation",
        SessionWithoutDisturbances: `${report.WithoutHeadRotation}`,
        SessionWithDisturbances: `${report.WithHeadRotation}`,
      },
    
      { type: "", SessionWithoutDisturbances: "", SessionWithDisturbances: `` },
      {
        type: "Session Configuration:",
        SessionWithoutDisturbances: "",
        SessionWithDisturbances: ``,
      },
      {
        type: "Session Length In Min:",
        SessionWithoutDisturbances: `${report.SessionLengthInMin}`,
        SessionWithDisturbances: ``,
      },
      {
        type: "Letters Delay In Sec:",
        SessionWithoutDisturbances: `${report.LettersDelayInSec}`,
        SessionWithDisturbances: ``,
      },
      {
        type: "Disturbance Time Range Min:",
        SessionWithoutDisturbances: `${report.disturbanceTimeRangeMax}`,
        SessionWithDisturbances: ``,
      },
      {
        type: "Disturbance Time Range Max:",
        SessionWithoutDisturbances: `${report.disturbanceTimeRangeMax}`,
        SessionWithDisturbances: ``,
      },
      {
        type: "Amount Of Should Press:",
        SessionWithoutDisturbances: `${report.amountOfShouldPress}`,
        SessionWithDisturbances: ``,
      },
      { type: "", SessionWithoutDisturbances: "", SessionWithDisturbances: `` },
      { type: "Disturbances metadata", SessionWithoutDisturbances: "", SessionWithDisturbances: `` },
      { type: "Type", SessionWithoutDisturbances: "Time", SessionWithDisturbances: `` },
      
    ];
    temp2.map((patient) => (
      data.push({ type: `${patient.Type}`, SessionWithoutDisturbances: `${(patient.TimesInSec).toString()}`, SessionWithDisturbances: `` }
    )
    ))
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data1 = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(data1, `${report.PatientName} - ${report.Time}.xlsx`);
  };
  

  useEffect(() => {
    if (!report || !id) {
      
      fetching();
    }
  }, [id, report]);
  const data = [
    { x: 1, y: 2, z: 3 },
    { x: 4, y: 5, z: 6 },
    { x: 7, y: 8, z: 9 }
  ];
  return (
    <MainScreen title="Screening Report">
     {/* <PolarGraph data={data} /> */}
      {report && (
        <div>
          <div className="testDetails">
            <h2>{report.PatientName}</h2>
            <h2>{report.Time}</h2>
          </div>
          <div className="deatilsTableContainer">
            <h5 className="h1-report">
              <b>Session configuration</b>
            </h5>
            <Table striped bordered hover className="deatilsTable">
              <tbody>
                <tr>
                  <td className="tdDeatilsTable">Session length in min</td>
                  <td className="tdDeatilsTable">
                    {report.SessionLengthInMin}
                  </td>
                </tr>
                <tr>
                  <td className="tdDeatilsTable">Letters delay in sec</td>
                  <td className="tdDeatilsTable">{report.LettersDelayInSec}</td>
                </tr>
                <tr>
                  <td className="tdDeatilsTable">Disturbance time range min</td>
                  <td className="tdDeatilsTable">{report.LettersDelayInSec}</td>
                </tr>
                <tr>
                  <td className="tdDeatilsTable">Disturbance time range max</td>
                  <td className="tdDeatilsTable">
                    {report.disturbanceTimeRangeMax}
                  </td>
                </tr>
                <tr>
                  <td className="tdDeatilsTable">Amount of should press</td>
                  <td className="tdDeatilsTable">
                    {report.amountOfShouldPress}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div>
            <div className="disturbancesTable">
              <h5>
                <b>Session with and without disturbances</b>
              </h5>
              <Table striped bordered hover className="disturbancesTableWidth">
                <tbody>
                  <th className="tdDisturbancesTableLeft" colSpan={2}></th>
                  <th className="tdDisturbancesTable">
                    Session With Disturbances
                  </th>
                  <th className="tdDisturbancesTable">
                    Session Without Disturbances
                  </th>
                  <tr>
                    <td className="tdDisturbancesTableLeft" colSpan={2}>
                      Letters data list
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithlettersDataList}
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithoutlettersDataList}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdDisturbancesTableLeft" colSpan={2}>
                      Times of should press
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithTimesOfShouldPress}
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithoutTimesOfShouldPress}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdDisturbancesTableLeft" colSpan={2}>
                      Pressed and should
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithPressedAndshould}
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithoutPressedAndshould}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdDisturbancesTableLeft" colSpan={2}>
                      Pressed and should not
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithPressedAndshouldNot}
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithoutPressedAndshouldNot}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdDisturbancesTableLeft" colSpan={2}>
                      Not pressed and should
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithPressedAndshouldNot}
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithNotPressedAndshould}
                    </td>
                  </tr>
                  <tr>
                    <td className="tdDisturbancesTableLeft" colSpan={2}>
                      Head rotation
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithHeadRotation}
                    </td>
                    <td className="tdDisturbancesTable">
                      {report.WithoutHeadRotation}
                    </td>
                  </tr>
                  {/* <tr>
                    <td colSpan={2}>Disturbances metadata</td>
                    <td>{report.DisturbancesMetadata}</td>
                    <td>-</td>
                  </tr> */}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="disturbancesTable">
            <h5>
              <b>Disturbances metadata</b>
            </h5>
            <Table striped bordered hover className="deatilsTable">
              <th className="tdDeatilsTable">Type </th>{" "}
              <th className="tdDeatilsTable">Time</th>
              <tbody>
                {
                temp2.map((patient) => (
      <tr>
        <td className="tdDeatilsTable">{patient.Type}</td>
        <td className="tdDeatilsTable">{(patient.TimesInSec).toString()}</td>
      </tr>
                  ))
  
                }
              </tbody>
            </Table>
          </div>
          <div className="div-export-button">
            <Button className="exportBtn mainBtn" onClick={exportToExcel}>
              Export to Excel
            </Button>
          </div>
        </div>
      )}
    </MainScreen>
  );
};
