import { useEffect, useState } from "react";

const FilterModal = ({ changeFilterModal }) => {

    const plus = "fa-solid fa-square-plus fa-lg"
    const minus = "fa-solid fa-square-minus fa-lg"
    const allCategories = [["red", minus], ["green", minus], ["yellow", minus], ["blue", minus], ["pink", minus], ["purple", minus]]
    return (
        <div className="filtermodal">
            <button className="close" onClick={changeFilterModal}><i className="fa-regular fa-circle-xmark fa-lg"></i></button>

            {allCategories.map(category =>
                <div className="filter-category-div">
                    <div className="category" style={{ backgroundColor: `${category[0]}` }}></div>
                    <div className="category-filter">{category[0]}</div>
                    <button className="filter-hide-btn"><i className={category[1]}></i></button>
                </div>
            )}
        </div>
    );
}

export default FilterModal;