import { useEffect } from "react";

const ViewAudience = () => {
  useEffect(() => {
   
    const mockSegments = [
      {
        segment_name: "last_10_days_blog_visits",
        schema: [{ first_name: "First Name" }, { last_name: "Last Name" }],
        created_at: "2025-10-28T10:00:00Z",
      },
      {
        segment_name: "active_users_q4",
        schema: [{ gender: "Gender" }, { age: "Age" }],
        created_at: "2025-10-27T15:30:00Z",
      },
    ];

    const tableData = mockSegments.map((seg) => [
      seg.segment_name,
      seg.schema.map((s) => Object.values(s)[0]).join(", "),
      new Date(seg.created_at).toLocaleString(),
    ]);

    // Initialize DataTable using global $ (from CDN)
    if ($.fn.DataTable.isDataTable("#segments-table")) {
      $("#segments-table").DataTable().destroy();
    }

    $("#segments-table").DataTable({
      data: tableData,
      columns: [
        { title: "Segment Name" },
        { title: "Schemas" },
        { title: "Created At" },
      ],
      pageLength: 10,
      searching: true,
      ordering: true,
      info: true,
      lengthChange: true,
      language: { emptyTable: "No segments saved yet." },
      destroy: true,
    });
  }, []);

  return (
    <div className="list-container">
      <div className="page-header">
        <a href="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </a>
        <span>View Audience</span>
      </div>

      <div className="trait-legend">
        <div className="legend-item">
          <div className="legend-dot user-trait"></div>
          <span>User Traits</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot group-trait"></div>
          <span>Group Traits</span>
        </div>
      </div>

      <div className="datatable-container">
        <table id="segments-table" className="display">
          <thead></thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAudience;