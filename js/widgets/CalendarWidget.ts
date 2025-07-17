import * as d3 from "d3";

export class CalendarWidget {

    public render( container: HTMLDivElement, d: { datetime: any, value: any }[], callback: any ): void {

        const width = 700;
        const height = 150;
        const cellSize = 15;
        const year = 2012;

        const svg = d3.select(container)
            .append("svg")
            .attr("width", "100%")
            .attr("height", height + 40)
            .attr("viewBox", `0 0 ${width} ${height + 40}`)
            .append("g")
            .attr("transform", "translate(50, 40)"); // Move grid to leave space for labels

        svg.append("text")
            .attr("class", "year-title")
            .attr("x", width / 2)
            .attr("y", -20)
            .attr("text-anchor", "middle")
            .text(year);

        // --- 2. DATA ---
        // Generate some random, sparse data for the year
        const data: any[] = [];
        const allDays = d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1));
        allDays.forEach(date => {
            // Randomly decide whether to include this day's data
            if (Math.random() > 0.6) { // about 40% of days will have data
                data.push({
                    date: date,
                    value: Math.random() // Random value between 0 and 1
                });
            }
        });

        // --- 3. SCALES ---
        const colorScale = d3.scaleSequential(d3.interpolateGreens)
            .domain([0, d3.max(data, d => d.value) * 0.7]); // Make dark green more achievable

        // --- 4. AXES / LABELS ---
        // Day of the week labels
        const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        svg.append("g")
            .selectAll("text")
            .data(dayLabels)
            .join("text")
            .attr("class", "day-label")
            .attr("x", -10)
            .attr("y", (d, i) => i * (cellSize + 2) + cellSize / 1.5)
            .attr("text-anchor", "end")
            .text(d => d);

        // Month labels
        const months = d3.timeMonths(new Date(year, 0, 1), new Date(year + 1, 0, 1));
        const monthGroup = svg.append("g")
            .selectAll("g")
            .data(months)
            .join("g")
            .attr("transform", (d, i) => `translate(${d3.timeWeek.count(d3.timeYear(d), d) * (cellSize + 2)}, 0)`);

        monthGroup.append("text")
            .attr("class", "month-label")
            .attr("x", (cellSize + 2) * 2)
            .attr("y", -8)
            .text(d => d3.timeFormat("%b")(d));

        // --- 5. DRAWING THE HEATMAP ---
        const tooltip = d3.select(".tooltip");
        const dayFormat = d3.timeFormat("%Y-%m-%d");

        svg.append("g")
            .selectAll("rect")
            // Bind directly to the data array. Only cells with data will be created.
            .data(data)
            .join("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            // Access the date object via d.date for positioning
            .attr("x", d => d3.timeWeek.count(d3.timeYear(d.date), d.date) * (cellSize + 2))
            .attr("y", d => d.date.getDay() * (cellSize + 2))
            .attr("rx", 3) // rounded corners
            .attr("ry", 3)
            // Access the value via d.value for color
            .attr("fill", d => colorScale(d.value))
            .attr("stroke", "#eee")
            .attr("stroke-width", 1)
            // --- 6. INTERACTIVITY ---
            .on("mouseover", function(event, d) {
                d3.select(this).attr("stroke", "#333").attr("stroke-width", 1.5);
                tooltip.style("opacity", 1);
            })
            .on("mousemove", function(event, d) {
                // The datum 'd' is now the object {date: ..., value: ...}
                const count = (d.value * 100).toFixed(0);
                tooltip.html(`${count} contributions on ${dayFormat(d.date)}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(event, d) {
                d3.select(this).attr("stroke", "#eee").attr("stroke-width", 1);
                tooltip.style("opacity", 0);
            })
            .on("click", () => {
                callback();
            });
            
        // --- 7. LEGEND ---
        const legendWidth = 200;
        const legendCellSize = 15;
        const legendData = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

        const legend = svg.append("g")
            .attr("transform", `translate(${width - legendWidth - 50}, ${height + 10})`);
            
        legend.append("text")
            .attr("class", "text-xs text-gray-500")
            .attr("x", -35)
            .attr("y", legendCellSize / 1.5)
            .text("Less");

        legend.selectAll("rect")
            .data(legendData)
            .join("rect")
            .attr("width", legendCellSize)
            .attr("height", legendCellSize)
            .attr("x", (d, i) => i * (legendCellSize + 2))
            .attr("y", 0)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("fill", d => colorScale(d * d3.max(data, d => d.value)));
            
        legend.append("text")
            .attr("class", "text-xs text-gray-500")
            .attr("x", legendData.length * (legendCellSize + 2))
            .attr("y", legendCellSize / 1.5)
            .text("More");

    }


}