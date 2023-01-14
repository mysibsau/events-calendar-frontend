import React, { useState } from "react";
import "./Pagination.scss";
import { usePagination } from "./usePagination";
import classnames from "classnames";
import { Select } from "../Select";
import { IconArrowLeft, IconArrowRight } from "../Icons";


interface IProps {
    perPage: number;
    setPerPage: (val: number) => void;
    page: number;
    setPage: (val: number) => void;
    count: number;
}

interface ISelectVal {
    id: number,
    name: string
}

const Pagination: React.FC<IProps> = ({ perPage, setPerPage, setPage, page, count }) => {
    const pageList = usePagination(page, perPage, count);

    const [selectVal, setSelectVal] = useState(perPage);

    const maxPage = pageList ? pageList[pageList.length - 1] : parseInt((count / perPage).toFixed(0));

    const optionsPagination: ISelectVal[] = [
        { id: 10, name: `Отображать по: 10` },
        { id: 30, name: `Отображать по: 30` },
        { id: 50, name: `Отображать по: 50` },
        { id: 100, name: `Отображать по: 100` },
    ];

    const changePage = (selectedPage: number | string) => {
        switch (selectedPage) {
            case "next":
                page < maxPage && setPage(page + 1);
                break;
            case "previous":
                page > 1 && setPage(page - 1);
                break;
            case "...":
                break;
            default:
                setPage(parseInt(selectedPage.toString()));
        }
    };

    const checkSel = (newPerPage: number) => {
        setSelectVal(newPerPage);
        setPerPage(newPerPage);
        setPage(1);
    };

    return (
        <div className={"Pagination"}>
            {maxPage !== 1 &&
                <div>
                    <span className={"arrows"} onClick={() => changePage("previous")}>
                        <IconArrowLeft size={25} />
                    </span>
                    <div className={"pageNums"}>
                        {pageList && pageList.map((pageNum, index) =>
                            <span
                                className={classnames({
                                    "number": pageNum !== "...",
                                    "current": pageNum === page
                                })}
                                onClick={() => changePage(pageNum)}
                                key={index}>{pageNum}</span>
                        )}
                    </div>
                    <span className={"arrows"} onClick={() => changePage("next")}>
                        <IconArrowRight size={25} />
                    </span>
                </div>
            }
            <Select options={optionsPagination} value={selectVal} setValue={checkSel} />
        </div>
    );
};

export default Pagination;