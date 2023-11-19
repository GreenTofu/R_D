/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import backIcon from "assets/icons/arrow-left-tail.png";
import ResourceHeader from "components/resourceHeader";
import ResourcePagination from "components/resourcePagination/resourcePagination";
import { CycleContext } from "utils/context";

import ReviewItem from "./reviewItem";
import useReviewList from "./useReviewList";

const ReviewList = ({ isHRM }) => {
  const { id } = useParams();
  const reviewCycle = useContext(CycleContext);
  const navigate = useNavigate();

  const {
    reviewList,
    total,
    totalPage,
    currentPage,
    setCurrentPage,
    onChangeSearch,
  } = useReviewList({ cycleId: id });

  const formatDate = (date) => {
    return moment(date).format("MMMM DD, YYYY");
  };

  const navigateToCreate = () => {
    navigate("create");
  };

  return (
    <div>
      <div className="flex justify-end mb-5 -mt-7">
        <h4 className="w-fit text-neutral-600">
          <b className="font-nunito text-neutral-600 mr-1">
            Review Cycle:{" "}
          </b>
          {formatDate(reviewCycle?.startDate)} -{" "}
          {formatDate(reviewCycle?.endDate)}
        </h4>
      </div>

      <div className="flex items-center w-full">
        <Link className="mr-5" to="/performances">
          <img className="w-6 h-6" src={backIcon} alt="back" />
        </Link>

        <ResourceHeader
          title="Review List"
          placeholder="Search by name or status..."
          searchClass="w-[70%]"
          onClickCreate={isHRM && navigateToCreate}
          onChangeSearch={onChangeSearch}
          noFilter
        />
      </div>

      <div className="bg-white mt-8 pt-5 rounded-md drop-shadow-sm w-full text-sm text-neutral-500">
        <div className="flex my-2 px-6 text-neutral-900">
          <div className="basis-3/12 text-sm font-nunito font-bold">
            Assigned To
          </div>
          <div className="basis-3/12 font-bold text-sm font-nunito">
            Status
          </div>
          <div className="basis-3/12 font-bold text-sm font-nunito">
            Evaluator Name
          </div>
          <div className="basis-3/12 font-bold text-sm font-nunito">
            Final Score
          </div>
          <div className="w-5" />
        </div>

        <div>
          {reviewList.length > 0 ? (
            reviewList.map((review) => (
              <ReviewItem key={review.id} item={review} />
            ))
          ) : (
            <div className="h-[200px] flex items-center justify-center">
              No review forms found
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between rounded-md drop-shadow-sm bg-white mt-8 h-[50px] px-6 items-center">
        <p>
          <span>{total}</span> results
        </p>

        <div>
          <ResourcePagination
            currentPage={currentPage}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
