import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Campus } from '../model/campus.model';
import { Lokaal } from '../model/lokaal.model';
import { json } from 'body-parser';
import { Sensor } from '../model/sensor.model';


@Injectable({
  providedIn: 'root'
})
export class GrafanaService {

  private baseUrl = 'http://localhost:4200/api';
  private version = 2;
  
  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": 'YOUR URL HERE',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Expose-Headers": "Set-Cookie",
    "Access-Control-Allow-Headers": "Content-Type, x-xsrf-token, X-Requested-With, Accept, Expires, Last-Modified, Cache-Control",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Authorization": "Bearer eyJrIjoiNUp1dDZKMjFZcE9ZWk5hclRDN29HQVh2MzBJM0xOR04iLCJuIjoiS2V5IiwiaWQiOjF9",
  });

  private options = { headers: this.headers };

  constructor(private http: HttpClient) {}

  get(campus_id: number): Observable<Campus[]> {
    return this.http.get<Campus[]>(`${this.baseUrl}/${campus_id}`);
  }

  create(data: Campus) {
    var jsonData = {
        "dashboard": {
          "id": null,
          "uid": data.campus_id.toString(),
          "title": data.name,
          "panels": [],
          "tags": [ "templated" ],
          "timezone": "browser",
          "schemaVersion": 16,
          "version": 0,
          "refresh": "25s"
        }
      }

      console.log(data.campus_id)

    return this.http.post(this.baseUrl+"/dashboards/db", jsonData, this.options).subscribe(data => console.log(data));
  }

  updateCampus(campus_id:number, name:string, campus_name:string) {

    this.http.get<any>(this.baseUrl+"/dashboards/uid/" + campus_id).subscribe(data => {
      var dashboard = data;

      dashboard.dashboard.title = name;
      for(let i = 0; i !== dashboard.dashboard.panels.length;i++){
        for(let j = 0; j !== dashboard.dashboard.panels[i].targets.length; j++){
          var test = dashboard.dashboard.panels[i].targets[j].tags[0].value;
          dashboard.dashboard.panels[i].targets[j].tags[0].value = test.replace(campus_name, name);
        }
      }

      return this.http.post(this.baseUrl+"/dashboards/db", dashboard, this.options).subscribe(data => console.log(data));
    })
  }

  updateLokaal(campus_id:number, nieuwe_naam:string, oude_lokaal_naam:string, sensor_id:string) {

    this.http.get<any>(this.baseUrl+"/dashboards/uid/" + campus_id).subscribe(data => {
    var dashboard = data;
    console.log(campus_id + " " + nieuwe_naam + " " + oude_lokaal_naam + " " + sensor_id)

      for(let i = 0; i !== dashboard.dashboard.panels.length;i++){
        for(let j = 0; j !== dashboard.dashboard.panels[i].targets.length; j++){
          if(dashboard.dashboard.panels[i].title === sensor_id){
            var test = dashboard.dashboard.panels[i].targets[j].tags[0].value;
            dashboard.dashboard.panels[i].targets[j].tags[0].value = test.replace(oude_lokaal_naam, nieuwe_naam);
          }
        }
      }

      return this.http.post(this.baseUrl+"/dashboards/db", dashboard, this.options).subscribe(data => console.log(data));
    })
  }

  addPanel(sensor: Sensor, campus_id: number, campus_naam: string, lokaal_naam:string): any{

    var dashboard = this.http.get<any>(this.baseUrl+"/dashboards/uid/" + campus_id).subscribe(data => 
    {
      console.log(sensor.id);
      var panels:any[] = data.dashboard.panels;
      panels.push(
        {
        "id": sensor.id,
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 0,
          "y": 0
        },
        "type": "timeseries",
        "timeFrom": "4h",
        "hideTimeOverride": true,
        "fieldConfig": {
          "defaults": {
            "custom": {
              "drawStyle": "line",
              "lineInterpolation": "linear",
              "barAlignment": 0,
              "lineWidth": 1,
              "fillOpacity": 0,
              "gradientMode": "opacity",
              "spanNulls": false,
              "showPoints": "auto",
              "pointSize": 5,
              "stacking": {
                "mode": "none",
                "group": "A"
              },
              "axisPlacement": "auto",
              "axisLabel": "",
              "scaleDistribution": {
                "type": "linear"
              },
              "hideFrom": {
                "tooltip": false,
                "viz": false,
                "legend": false
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "color": {
              "mode": "palette-classic"
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": [
            {
              "matcher": {
                "id": "byName",
                "options": "temp"
              },
              "properties": [
                {
                  "id": "custom.axisPlacement",
                  "value": "right"
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "hum"
              },
              "properties": [
                {
                  "id": "custom.axisPlacement",
                  "value": "right"
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "co2"
              },
              "properties": [
                {
                  "id": "custom.fillOpacity",
                  "value": 100
                }
              ]
            }
          ]
        },
        "options": {
          "tooltip": {
            "mode": "single",
            "sort": "none"
          },
          "legend": {
            "displayMode": "list",
            "placement": "bottom",
            "calcs": []
          }
        },
        "targets": [
          {
            "alias": "co2",
            "datasource": {
              "type": "influxdb",
              "uid": "vm-E8Lf7z"
            },
            "groupBy": [
              {
                "params": [
                  "10s"
                ],
                "type": "time"
              },
              {
                "params": [
                  "linear"
                ],
                "type": "fill"
              }
            ],
            "measurement": "mqtt_consumer",
            "orderByTime": "ASC",
            "policy": "default",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "mean"
                }
              ]
            ],
            "tags": [
              {
                "key": "topic",
                "operator": "=",
                "value": campus_naam + "/" + lokaal_naam + "/co2"
              }
            ]
          },
          {
            "alias": "temp",
            "datasource": {
              "type": "influxdb",
              "uid": "vm-E8Lf7z"
            },
            "groupBy": [
              {
                "params": [
                  "10s"
                ],
                "type": "time"
              },
              {
                "params": [
                  "linear"
                ],
                "type": "fill"
              }
            ],
            "hide": false,
            "measurement": "mqtt_consumer",
            "orderByTime": "ASC",
            "policy": "default",
            "refId": "B",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "mean"
                }
              ]
            ],
            "tags": [
              {
                "key": "topic",
                "operator": "=",
                "value": campus_naam + "/" + lokaal_naam+"/temp"
              }
            ]
          },
          {
            "alias": "hum",
            "datasource": {
              "type": "influxdb",
              "uid": "vm-E8Lf7z"
            },
            "groupBy": [
              {
                "params": [
                  "10s"
                ],
                "type": "time"
              },
              {
                "params": [
                  "linear"
                ],
                "type": "fill"
              }
            ],
            "hide": false,
            "measurement": "mqtt_consumer",
            "orderByTime": "ASC",
            "policy": "default",
            "refId": "C",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "mean"
                }
              ]
            ],
            "tags": [
              {
                "key": "topic",
                "operator": "=",
                "value": campus_naam + "/" + lokaal_naam+"/hum"
              }
            ]
          }
        ],
        "datasource": null,
        "title": sensor.sensor_id.toString()
      });
      console.log(panels);
      var jsonData = {
        "dashboard" :{
            "uid": campus_id.toString(),
            "title": campus_naam,
            "version": data.dashboard.version,
            "panels":panels
        }
      }
      this.http.post<any[]>(this.baseUrl+"/dashboards/db", jsonData, this.options).subscribe();
    })
    return {"value": "ok"}
  }

  delete(sensor_id:string, campus_id:number){

    this.http.get<any>(this.baseUrl+"/dashboards/uid/" + campus_id).subscribe(data => {
    var dashboard = data;

    for(let i = 0; i < dashboard.dashboard.panels.length; i++){
      console.log(i);
      console.log(dashboard.dashboard.panels[i].title)
      if  (dashboard.dashboard.panels[i].title === sensor_id){
        dashboard.dashboard.panels.splice(i,1);
      }

    }
    return this.http.post(this.baseUrl+"/dashboards/db", dashboard, this.options);
    })
  }

  deleteDashboard(campus_id:any){

      return this.http.delete(this.baseUrl + "/dashboards/uid/"+ campus_id, this.options).subscribe(data => console.log(data));
  }

}