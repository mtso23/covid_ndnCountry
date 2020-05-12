// https://observablehq.com/@mtso23/covid-19-in-indian-country@1564
import define1 from "./7764a40fe6b83ca1@365.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["md"], function(md){return(
md`# Covid-19 in Indian Country`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
Replicating the charts in [this article](https://www.nytimes.com/interactive/2020/03/19/world/coronavirus-flatten-the-curve-countries.html) that hasn't been updated since March 18th.

The data compiled by [Indian Country Today](https://indiancountrytoday.com/coronavirus/)

Updated based on download on 5/8/20
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Daily New Cases & Deaths for Indian Country`
)});
  main.variable(observer()).define(["vl","total"], function(vl,total)
{
  const charts = vl.markLine({ color: "#F77405"}).encode(
    vl
      .y()
      .fieldQ('avg')
      .axis({ title: '─ 7 day avg', gridOpacity: 0.2 }),
    vl
      .x()
      .fieldT('date')
      .axis({ title: null, gridOpacity: 0.2 })
  );
  const chartsd = vl.markLine({ color: "red"}).encode(
    vl
      .y()
      .fieldQ('avg2')
      .axis({ title: '', gridOpacity: 0.2 }),
    vl
      .x()
      .fieldT('date')
      .axis({ title: null, gridOpacity: 0.2 })
  );
  const barss = vl.markBar({ color: "orange", opacity: 0.4, width: 12}).encode(
    vl
      .y()
      .fieldQ('cases')
      .axis({ title: 'Daily Cases', gridOpacity: 0.2 })
      .title(""),
        vl.tooltip([{
          "field": "date",
          "title": "Date",
          "type": "temporal"
          },{
        "field": "cases",
        "title": "Positive Cases"
      },{
        "field": "deaths",
        "title": "Deaths"
      }]),
    vl
      .x()
      .fieldT('date')
      .axis({ title: null, gridOpacity: 0.2 })
  );
  const barsd = vl.markBar({ color: "red", opacity: 0.4, width: 12 }).encode(
    vl
      .y()
      .fieldQ('deaths')
      .axis({ title: 'Deaths', gridOpacity: 0.2 })
      .title(""),
        vl.tooltip([{
          "field": "date",
          "title": "Date",
          "type": "temporal"
          },{
        "field": "cases",
        "title": "Positive Cases"
      },{
        "field": "deaths",
        "title": "Deaths"
      }]),
    vl
      .x()
      .fieldT('date')
      .axis({ title: null, gridOpacity: 0.2 })
  );
  const marks = vl.markPoint({ color: "#00AC9C" }).encode(
    vl
      .y()
      .fieldQ('cases')
      .aggregate("max")
      .axis({ title: '' }),
    vl
      .x()
      .fieldT('date')
      .aggregate({ argmax: 'cases' })
      .axis({ title: "" })
  );
  const marksd = vl.markPoint({ color: "red" }).encode(
    vl
      .y()
      .fieldQ('deaths')
      .aggregate("max")
      .axis({ title: '' }),
    vl
      .x()
      .fieldT('date')
      .aggregate({ argmax: 'deaths' })
      .axis({ title: "" })
  );
  const markt = vl.markText({ dy: -10, dx: 0 }).encode(
    vl
      .y()
      .fieldQ('cases')
      .aggregate("max")
      .axis({ title: '' }),
    vl
      .x()
      .fieldT('date')
      .aggregate({ argmax: 'cases' })
      .axis({ title: "" }),
    vl
      .text()
      .fieldQ('cases')
      .aggregate("max")
  );
  const markd = vl.markText({ dy: -10, dx: 0 }).encode(
    vl
      .y()
      .fieldQ('deaths')
      .aggregate("max")
      .axis({ title: '' }),
    vl
      .x()
      .fieldT('date')
      .aggregate({ argmax: 'deaths' })
      .axis({ title: "" }),
    vl
      .text()
      .fieldQ('deaths')
      .aggregate("max")
  );
  // return marks.render();
  const out = vl
    .layer(barss, barsd, charts, chartsd, markt, markd, marks, marksd)
    .width(750)
    .height(300)
    .data(total)
    .transform(
      vl
        .window(vl.mean('cases').as('avg'))
        .sort(vl.field('date'))
        .frame([-7, 0])
    );
  // return JSON.stringify(out.toJSON());
  return out.render();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Daily New Cases & Deaths by Tribal Nation`
)});
  main.variable(observer("viewof selected_rez")).define("viewof selected_rez", ["DOM","ndncountry"], function(DOM,ndncountry){return(
DOM.select(ndncountry)
)});
  main.variable(observer("selected_rez")).define("selected_rez", ["Generators", "viewof selected_rez"], (G, _) => G.input(_));
  main.variable(observer()).define(["raw","selected_rez","vl"], function(raw,selected_rez,vl)
{
  const data = raw.filter(function(d) {
    return d.nation === selected_rez;
  });
  const charts = vl.markLine({ color: "#F77405"}).encode(
    vl
      .y()
      .fieldQ('avg')
      .axis({ title: '─ 7 day avg', gridOpacity: 0.2 }),
    vl
      .x()
      .fieldT('date')
      .axis({ title: null, gridOpacity: 0.2 })
  );
  const chartsd = vl.markLine({ color: "red"}).encode(
    vl
      .y()
      .fieldQ('avg2')
      .axis({ title: '', gridOpacity: 0.2 }),
    vl
      .x()
      .fieldT('date')
      .axis({ title: null, gridOpacity: 0.2 })
  );
  const barss = vl.markBar({ color: "orange", opacity: 0.4, width: 14}).encode(
    vl
      .y()
      .fieldQ('cases')
      .axis({ title: 'Daily Cases', gridOpacity: 0.2 })
      .title(""),
        vl.tooltip([{
          "field": "date",
          "title": "Date",
          "type": "temporal"
          },{
        "field": "cases",
        "title": "Positive Cases"
      },{
        "field": "deaths",
        "title": "Deaths"
      }]),
    vl
      .x()
      .fieldT('date')
      .axis({ title: null, gridOpacity: 0.2 })
  );
  const barsd = vl.markBar({ color: "red", opacity: 0.4, width: 14 }).encode(
    vl
      .y()
      .fieldQ('deaths')
      .axis({ title: 'Deaths', gridOpacity: 0.2 })
      .title(""),
        vl.tooltip([{
        "field": "cases",
        "title": "Positive Cases"
      },{
        "field": "deaths",
        "title": "Deaths"
      }]),
    vl
      .x()
      .fieldT('date')
      .axis({ title: null, gridOpacity: 0.2 })
  );
  const marks = vl.markPoint({ color: "#00AC9C" }).encode(
    vl
      .y()
      .fieldQ('cases')
      .aggregate("max")
      .axis({ title: '' }),
    vl
      .x()
      .fieldT('date')
      .aggregate({ argmax: 'cases' })
      .axis({ title: "" })
  );
  const marksd = vl.markPoint({ color: "red" }).encode(
    vl
      .y()
      .fieldQ('deaths')
      .aggregate("max")
      .axis({ title: '' }),
    vl
      .x()
      .fieldT('date')
      .aggregate({ argmax: 'deaths' })
      .axis({ title: "" })
  );
  const markt = vl.markText({ dy: -10, dx: 0 }).encode(
    vl
      .y()
      .fieldQ('cases')
      .aggregate("max")
      .axis({ title: '' }),
    vl
      .x()
      .fieldT('date')
      .aggregate({ argmax: 'cases' })
      .axis({ title: "" }),
    vl
      .text()
      .fieldQ('cases')
      .aggregate("max")
  );
  const markd = vl.markText({ dy: -10, dx: 0 }).encode(
    vl
      .y()
      .fieldQ('deaths')
      .aggregate("max")
      .axis({ title: '' }),
    vl
      .x()
      .fieldT('date')
      .aggregate({ argmax: 'deaths' })
      .axis({ title: "" }),
    vl
      .text()
      .fieldQ('deaths')
      .aggregate("max")
  );
  // return marks.render();
  const out = vl
    .layer(barss, barsd, charts, chartsd, markt, markd, marks, marksd)
    .width(750)
    .height(300)
    .data(data)
    .transform(
      vl
        .groupby('nation')
        .window(vl.mean('cases').as('avg'))
        .sort(vl.field('nation'), vl.field('date'))
        .frame([-7, 0])
    );
  // return JSON.stringify(out.toJSON());
  return out.render();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Case Rate (per 100,000 people) by Tribal Nation`
)});
  main.variable(observer()).define(["vl","rates"], function(vl,rates)
{
  const barss = vl.markBar({ color: "#00AC9C", opacity: 0.4, width: 12})
  .encode(
    vl
      .y()
      .fieldQ('caserate')
      .axis({ title: 'Cases per 100,000', gridOpacity: 0.2 })
      .title(""),
        vl.tooltip([{
          "field": "Where",
          "title": "Location"
          },{
        "field": "caserate",
        "title": "Case Rate",
            "format": ".0f"
      },{
        "field": "cases",
        "title": "Confirmed Cases"
      },{
        "field": "tot_pop",
        "title": "Total Population"
      }]),
    vl
      .x()
      .fieldN('Where')
      .sort(vl.median('caserate').op('average').order('descending'))
      .axis({ title: null, gridOpacity: 0.2 })
  );
  // return marks.render();
  const out = vl
    .layer(barss)
    .width(750)
    .height(300)
    .data(rates)
  // return JSON.stringify(out.toJSON());
  return out.render();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Case Rate by Tribal Nation and State`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`State rates from [John Hopkins data]("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/05-06-2020.csv") for May 6, 2020`
)});
  main.variable(observer()).define(["vl","combo"], function(vl,combo)
{
  const barss = vl.markBar({opacity: 0.4, width: 12})
  .encode(
    vl
      .y()
      .fieldQ('caserate')
      .axis({ title: 'Cases per 100,000', gridOpacity: 0.2 })
      .title(""),
        vl.tooltip([{
          "field": "location",
          "title": "Location"
          },{
        "field": "cases",
        "title": "Confirmed Cases",
            "format": ".0f"
      },{
        "field": "caserate",
        "title": "Cases per 100,000",
            "format": ".0f"
      }]),
    vl
      .x()
      .fieldN('location')
      .sort(vl.median('caserate').op('average').order('descending'))
      .axis({ title: null, gridOpacity: 0.2 })
  );
  // return marks.render();
  const out = vl
    .layer(barss)
    .width(750)
    .height(300)
    .data(combo)
  // return JSON.stringify(out.toJSON());
  return out.render();
}
);
  main.variable(observer("rezfilt")).define("rezfilt", ["raw"], function(raw){return(
raw.filter(function(d) {
  return ["Navajo Nation", "Cherokee", "Choctaw Nation", "Pueblo of Zia", "Pueblo of Zuni", "Lummi","Pueblo of San Felipe", "Kewa Pueblo", "Hopi", "Mississippi Band of Choctaw Indians", "Fort Berthold Indian Reservation", "White Mountain Apache Tribe", "Colville Reservation", "Ho-Chunk", "Fort Apache Indian Reservation"].includes(d.nation);
})
)});
  main.variable(observer("raw")).define("raw", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/mtso23/covid_ndnCountry/master/totalbytribe.csv", d3.autoType)
)});
  main.variable(observer("total")).define("total", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/mtso23/covid_ndnCountry/master/totalndncntry.csv", d3.autoType)
)});
  main.variable(observer("rates")).define("rates", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/mtso23/covid_ndnCountry/master/triberates.csv", d3.autoType)
)});
  main.variable(observer("combo")).define("combo", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/mtso23/covid_ndnCountry/master/rates_combo.csv", d3.autoType)
)});
  main.variable(observer("sortedrates")).define("sortedrates", ["rates","d3a"], function(rates,d3a){return(
rates.slice().sort((a, b) => d3a.descending(a.caserate, b.caserate))
)});
  main.variable(observer("tidy2")).define("tidy2", ["dt"], function(dt){return(
(data, type) => {
  const t = data
    .map(d => {
      let prev = 0; // previous total, to compute diffs
      let seven = 0;
      let group = 0;
      return (
        Object.keys(d)
          .filter(dt.timeParse("%m/%d/%y"))
          // .filter(d => d !== "2/12/20") // bad data day
          .map(k => {
            const total = +d[k],
            cases = total;
            prev = total;
            seven = total/7;
            group = total % 8;
            return {
              type,
              country: d["nation"],
              date: dt.timeParse("%m/%d/%y")(k),
              ymd: dt.timeFormat("%Y-%m-%d")(dt.timeParse("%m/%d/%y")(k)),
              cases,
              seven,
              group,
              total
            };
          })
      );
    })
    .flat()
  
  return t;
}
)});
  main.variable(observer("ndncountry")).define("ndncountry", ["raw"], function(raw){return(
raw.reduce(function(acc, it) {
  console.log(it.nation);
  if(!acc.includes(it.nation) && it.nation) acc.push(it.nation);
  return acc;
  },[])
)});
  main.variable(observer("confirmed2")).define("confirmed2", ["tidy2","total"], function(tidy2,total){return(
tidy2(total, "confirmed")
)});
  main.variable(observer("rezdata")).define("rezdata", ["confirmed2"], function(confirmed2){return(
Object.values(confirmed2.reduce(function(r, e) {
  var key = e.country + '|' + e.date;
  if (!r[key]) {
    r[key] = {"country": e.country, "date": e.date, "cases": e.cases, total: e.total};
  } else {
    r[key].cases += e.cases;
    r[key].total += e.total;
  }
  return r;
}, {}))
)});
  main.variable(observer("GetTopTwenty")).define("GetTopTwenty", function(){return(
function GetTopTwenty(arrayData){  //sorting to top 3 function
  arrayData.sort(function(a, b) {
                   return parseFloat(b.value) - parseFloat(a.value);
                 });
  return arrayData.slice(0, 20); 
}
)});
  main.variable(observer("us")).define("us", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/05-06-2020.csv", d3.autoType)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### References
- https://wattenberger.com/blog/d3#manipulating-data
  - https://github.com/d3/d3-array#group
  - https://github.com/d3/d3-array#rollup
- http://learnjsdata.com/iterate_data.html
- https://observablehq.com/@mbostock/exploring-data-with-vega-lite
- https://github.com/vega/vega-lite
- https://www.nytimes.com/interactive/2020/03/19/world/coronavirus-flatten-the-curve-countries.html
- https://observablehq.com/@fil/ncov2019-data
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Library`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3-fetch")
)});
  main.variable(observer("d3a")).define("d3a", ["require"], function(require){return(
require("d3-array@2")
)});
  main.variable(observer("dt")).define("dt", ["require"], function(require){return(
require("d3-time-format")
)});
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  main.variable(observer("vegaTooltip")).define("vegaTooltip", ["require"], function(require){return(
require('vega-tooltip')
)});
  main.variable(observer("vegalite")).define("vegalite", ["require"], function(require){return(
require("@observablehq/vega-lite@0.2")
)});
  return main;
}
