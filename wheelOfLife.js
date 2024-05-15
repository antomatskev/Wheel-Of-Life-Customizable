const defaultCats = [
    {
        name: "Friendship",
        color: "#001699",
        value: 10,
    },
    {
        name: "Family",
        color: "#3448d8",
        value: 10,
    },
    {
        name: "Inner circle",
        color: "#7a88f8",
        value: 10,
    },
    {
        name: "Personal life",
        color: "#001dff",
        value: 10,
    },
    {
        name: "Career",
        color: "#43ff00",
        value: 10,
    },
    {
        name: "Finance",
        color: "#1e6101",
        value: 10,
    },
    {
        name: "Learning",
        color: "#7aa66d",
        value: 10,
    },
    {
        name: "Hobby",
        color: "#4ab823",
        value: 10,
    },
    {
        name: "Leisure",
        color: "#ffeb00",
        value: 10,
    },
    {
        name: "Travelling",
        color: "#817400",
        value: 10,
    },
    {
        name: "Free time",
        color: "#eae068",
        value: 10,
    },
    {
        name: "Image",
        color: "#ffae00",
        value: 10,
    },
    {
        name: "Health",
        color: "#ff4400",
        value: 10,
    },
    {
        name: "Mental health",
        color: "#7c2700",
        value: 10,
    },
    {
        name: "Self-development",
        color: "#ff936b",
        value: 10,
    },
    {
        name: "Home",
        color: "#d35a2c",
        value: 10,
    },
];

!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
            ? define(e)
            : ((t = "undefined" != typeof globalThis ? globalThis : t || self).WheelOfLife = e());
})(this, function () {
    "use strict";
    return {
        setup: function (chartEl, sectionsEl, cats) {
            // Initialize options with empty series
            var options = {
                chart: {
                    type: "polarArea",
                    toolbar: {
                        show: true,
                    },
                    animations: {
                        animateGradually: {
                            enabled: false,
                        },
                    },
                },
                series: [], // Initialize series with empty array
                labels: [],
                yaxis: {
                    max: 10,
                },
                dataLabels: {
                    enabled: true,
                    formatter: (_, opt) => cats[opt.seriesIndex].name,
                },
                legend: {show: false},
            };

            var chart = new ApexCharts(chartEl, options);
            chart.render();

            // Function to update chart and sections
            function updateChartAndSections(config) {
                // Update series with values from config
                const chartSeries = config.map((c) => c.value);
                const chartLabels = config.map((c) => c.name);
                const chartColors = config.map((c) => c.color);

                options.series = chartSeries;
                options.labels = chartLabels;
                options.colors = chartColors;

                chart.updateOptions(options);

                // Clear sections
                sectionsEl.innerHTML = "";

                // Create sections for each configuration
                config.forEach((c, i) => {
                    const section = document.createElement("section");
                    // Header
                    const header = document.createElement("h1");
                    header.textContent = c.name;
                    section.appendChild(header);
                    // Input
                    const input = document.createElement("input");
                    input.id = `input-${i}`;
                    input.type = "range";
                    input.min = "1";
                    input.max = "10";
                    input.step = "1";
                    input.value = c.value;
                    input.oninput = (e) => {
                        config[i].value = parseInt(e.target.value);
                        updateChartAndSections(config);
                    };
                    section.append(input);

                    // Add section
                    sectionsEl.appendChild(section);
                });
            }

            // Initially render default configurations
            updateChartAndSections(cats);

            document.addEventListener('DOMContentLoaded', function () {
                const form = document.getElementById('addCatForm');
                form.addEventListener('submit', function (event) {
                    event.preventDefault();

                    const name = document.getElementById('name').value;
                    const color = document.getElementById('colorPicker').value;
                    const value = 10

                    const newElement = {name, color, value};
                    cats.push(newElement);

                    // Optionally, you can reset the form fields after submission
                    form.reset();
                    updateChartAndSections(cats);

                    console.log('New category added:', newElement);
                    console.log('Updated cats:', cats);
                });
            });

            document.addEventListener('DOMContentLoaded', function () {
                const form = document.getElementById('removeAllCatsForm');
                form.addEventListener('submit', function (event) {
                    if (window.confirm("Are you sure you want to remove all categories?")) {
                        event.preventDefault();
                        cats.length = 0;
                        updateChartAndSections(cats);
                        console.log('All categories removed');
                        console.log('Updated cats:', cats);
                    }
                });
            });
        },
    };
});
