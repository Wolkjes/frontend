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

  addPanel(sensor: Sensor, campus_id: number, campus_naam: string, lokaal_naam:string){

    var dashboard = this.http.get<any>(this.baseUrl+"/dashboards/uid/" + campus_id).subscribe(data => 
    {
      console.log(data.dashboard.version+1);
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
        "datasource": null
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
      return this.http.post(this.baseUrl+"/dashboards/db", jsonData, this.options).subscribe(data => console.log(data));
    })
  }

}