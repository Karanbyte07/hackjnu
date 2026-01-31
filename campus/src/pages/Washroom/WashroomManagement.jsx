import React, { useState, useCallback } from "react";
import PageHeader from "../../components/PageHeader";
import SectionCard from "../../components/SectionCard";
import PrimaryButton from "../../components/PrimaryButton";

const WashroomManagement = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedGender, setSelectedGender] = useState("Female");
  const [allIssues, setAllIssues] = useState([]);
  const [isLoadingIssues, setIsLoadingIssues] = useState(false);

  const fetchAllIssues = useCallback(async () => {
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/washroom/all`;

    setIsLoadingIssues(true);

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setAllIssues(data);
    } catch (error) {
      console.error("Unable to fetch issues:", error);
    } finally {
      setIsLoadingIssues(false);
    }
  }, []);

  const handleSubmitIssue = useCallback(async () => {
    if (!selectedIssue) {
      setSubmitMessage("Please select issue type.");
      return;
    }

    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${baseURL}/washroom/report`;

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issue: selectedIssue,
          gender: selectedGender
        }),
      });

      if (!response.ok) {
        throw new Error(`Report failed with status ${response.status}`);
      }

      const data = await response.json();
      setSubmitMessage(`Issue reported successfully! Priority: ${data.priority}`);
      setSelectedIssue("");
      setSelectedGender("");
      fetchAllIssues(); // Refresh issues list
    } catch (error) {
      setSubmitMessage(
        error?.message || "Unable to submit report right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedIssue, selectedGender, fetchAllIssues]);

  React.useEffect(() => {
    fetchAllIssues();
  }, [fetchAllIssues]);
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        badge="Smart Washroom"
        title="Smart Washroom Management"
        subtitle="Real‑time hygiene reports, gender‑based access, and priority alerts for girls’ washrooms."
      />

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <SectionCard title="Report an Issue">
          <p className="text-xs text-slate-300 mb-2">
            Report female washroom cleanliness or supply issues.
          </p>
          
          <label className="text-[11px] text-slate-400 mb-1 block">
            Issue Type
          </label>
          <select
            className="w-full mb-3 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs"
            value={selectedIssue}
            onChange={(e) => setSelectedIssue(e.target.value)}
          >
            <option value="">Select issue type</option>
            <option value="Unclean washroom">Unclean washroom</option>
            <option value="No water / low pressure">No water / low pressure</option>
            <option value="No sanitary napkins">No sanitary napkins</option>
            <option value="Broken tap / flush">Broken tap / flush</option>
          </select>
          
          {submitMessage && (
            <p className={`text-xs mb-2 ${
              submitMessage.includes('success') ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {submitMessage}
            </p>
          )}
          
          <PrimaryButton
            className="w-full"
            onClick={handleSubmitIssue}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </PrimaryButton>
        </SectionCard>

        <SectionCard title="Live Alerts">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-300">Recent reports</p>
            <button
              onClick={fetchAllIssues}
              className="px-2 py-1 rounded-lg bg-slate-800 text-[10px]"
              disabled={isLoadingIssues}
            >
              {isLoadingIssues ? "Loading..." : "Refresh"}
            </button>
          </div>
          
          {allIssues.length === 0 ? (
            <p className="text-xs text-slate-400">No issues reported yet.</p>
          ) : (
            <ul className="text-xs space-y-1.5">
              {allIssues.slice(-5).reverse().map((item, idx) => (
                <li key={idx} className="flex justify-between items-start">
                  <span>{item.gender} washroom: {item.issue}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ml-2 ${
                    item.priority === 'HIGH' 
                      ? 'bg-rose-500/20 text-rose-400' 
                      : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {item.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Admin Actions">
          <ul className="text-xs space-y-1.5">
            <li>Assign housekeeping staff and track closure time.</li>
            <li>Escalate priority washrooms to supervisors.</li>
            <li>Generate daily hygiene compliance reports.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

export default WashroomManagement;
