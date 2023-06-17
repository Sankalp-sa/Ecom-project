import React from "react";

export default function CategoryForm({
  handleSubmit,
  category,
  setCategory,
  icon,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex">
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Enter new Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mx-2">
            {icon}
          </button>
        </div>
      </form>
    </>
  );
}
