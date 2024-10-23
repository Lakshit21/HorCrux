import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { getLinks } from "../services/api";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const CheckStats = () => {
  const [tagFrequency, setTagFrequency] = useState({
    labels: [],
    datasets: [
      {
        label: "Tag Frequency",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });
  const [dailyActivity, setDailyActivity] = useState({
    labels: [],
    datasets: [
      {
        label: "Created Links",
        data: [],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "Updated Links",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getLinks();
      calculateTagFrequency(data);
      calculateDailyActivity(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const calculateTagFrequency = (links) => {
    const tagMap = {};
    links.forEach((link) => {
      link.tags.forEach((tag) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    });
    const sortedTags = Object.entries(tagMap).sort((a, b) => b[1] - a[1]);
    const topTags = sortedTags.slice(0, 20);

    const DataObject = {
      labels: topTags.map(([tag]) => tag),
      datasets: [
        {
          label: "Tag Frequency",
          data: topTags.map(([_, count]) => count),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    setTagFrequency(DataObject);
  };

  const calculateDailyActivity = (links) => {
    console.log("calculateDailyActivity -> param", links);
    const createdMap = {};
    const updatedMap = {};

    links.forEach((link) => {
      const createdDate = new Date(link.created_at).toLocaleDateString();
      const updatedDate = new Date(link.updated_at).toLocaleDateString();

      createdMap[createdDate] = (createdMap[createdDate] || 0) + 1;
      updatedMap[updatedDate] = (updatedMap[updatedDate] || 0) + 1;
    });

    const allDates = Array.from(
      new Set([...Object.keys(createdMap), ...Object.keys(updatedMap)]),
    ).sort((a, b) => new Date(a) - new Date(b));

    setDailyActivity({
      labels: allDates,
      datasets: [
        {
          label: "Created Links",
          data: allDates.map((date) => createdMap[date] || 0),
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
        {
          label: "Updated Links",
          data: allDates.map((date) => updatedMap[date] || 0),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    });
  };

  return (
    <div>
      <h2>Horcrux Statistics</h2>

      <div style={{ width: "70%", margin: "0 auto" }}>
        <h3>Top 20 Tag Frequency</h3>
        <Bar
          data={tagFrequency}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div style={{ width: "70%", margin: "0 auto", marginTop: "50px" }}>
        <h3>Daily Activity (Created and Updated)</h3>
        <Line
          data={dailyActivity}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CheckStats;
