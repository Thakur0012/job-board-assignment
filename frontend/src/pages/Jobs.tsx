import { useEffect, useState } from "react";
import axios from "axios";

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  postedAt: string;
}

const API_URL = "http://localhost:3000";

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs`);

      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.location.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredJobs(result);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, jobs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.length < 3) {
      alert("Title should be minimum 3 characters");
      return;
    }

    if (location.length < 2) {
      alert("Location should be minimum 2 characters");
      return;
    }

    if (!type) {
      alert("Please select a job type");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/jobs`, {
        title,
        location,
        type,
      });

      setJobs([response.data, ...jobs]);
      setFilteredJobs([response.data, ...jobs]);

      setTitle("");
      setLocation("");
      setType("");
    } catch (err) {
      console.error(err);
      alert("Failed to add job");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (error) {
    return (
      <h2
        style={{
          textAlign: "center",
          color: "red",
        }}
      >
        {error}
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Job Board
      </h1>

      <input
        type="text"
        placeholder="Search by title or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "25px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{job.title}</h2>

            <p>📍 {job.location}</p>

            <p>💼 {job.type}</p>

            <p
              style={{
                color: "gray",
              }}
            >
              Posted: {job.postedAt}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Add New Job</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
            }}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
            }}
          />

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <option value="">
              Select Job Type
            </option>

            <option value="Full-Time">
              Full-Time
            </option>

            <option value="Part-Time">
              Part-Time
            </option>

            <option value="Contract">
              Contract
            </option>
          </select>

          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default Jobs;