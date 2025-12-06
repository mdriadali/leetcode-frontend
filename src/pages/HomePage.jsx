import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { logoutUser } from "../context/authSlice";
import axiosClient from "../utils/axiosClient";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: "all",
    tag: "all",
    status: "all",
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get("/problem/allProblem");
        setProblems(data);
      } catch (error) {
        console.log("Error fetching problems" + error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get("/problem/solved");
        setSolvedProblems(data);
      } catch (error) {
        console.log("Error fetching  solved problems" + error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const filteredProblems = problems.filter((problem) => {
    const difficultyMatch =
      filters.difficulty === "all" || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === "all" || problem.tags === filters.tag;
    const statusMatch =
      filters.status === "all" ||
      solvedProblems.some((sp) => sp._id === problem._id);

    return difficultyMatch && tagMatch && statusMatch;
  });

  return (
    <>
      <div className="min-h-screen bg-base-200">
        {/* Navigation Bar */}
        <nav className="navbar bg-base-100 shadow-lg px-4">
          <div className="flex-1">
            <NavLink to="/" className="btn btn-ghost text-xl">
              LeetCode
            </NavLink>
          </div>
          <div className="flex-none gap-4">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost">
                {user?.firstName}
              </div>
              <ul className="mt-3 p-2 shadow menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
                {user.role=='admin'&&<li><NavLink to="/admin" >Admin</NavLink></li>}
              </ul>
            </div>
          </div>
        </nav>

        {/* Main content */}

        <div className="container mx-auto p-4">
          {/* Filter */}
          <div className=" flex flex-wrap gap-4 mb-6">
            {/* new status filter */}
            <select
              className="select select-bordered"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="all">All Problems</option>
              <option value="solved">Solved Problems</option>
            </select>

            <select
              className="select select-bordered"
              value={filters.difficulty}
              onChange={(e) =>
                setFilters({ ...filters, difficulty: e.target.value })
              }
            >
              <option value="all">All difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              className="select select-bordered"
              value={filters.tag}
              onChange={(e) => setFilters({ ...filters, tag:e.target.value })}
            >
              <option value="all">All Tags</option>
              <option value="array">Array</option>
              <option value="string">String</option>
              <option value="linkedList">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dp">Dp</option>
              <option value="Math">Math</option>
            </select>
          </div>

          {/* problem list */}
{/* {console.log(filteredProblems)} */}
          <div className="grid gap-4">
            {filteredProblems.map((prob) => (
              <div key={prob._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between ">
                    <NavLink to={`/problem/getProblem/${prob._id}`}>
                    <h2 className="card-title hover:text-blue-500">{prob.title}</h2>
                    </NavLink>
                    {solvedProblems.some((sp) => sp._id === prob._id) && (
                      <div className=" flex badge badge-success gap-2">Solved</div>
                     )} 
                  </div>

                  <div className="flex gap-2">
                    <div
                      className={`badge ${getDifficultyBadgeColor(
                        prob.difficulty
                      )}`}
                    >
                      {prob.difficulty}
                    </div>

                    <div>  
                      {prob?.tags &&( <div  className='badge badge-info ml-2'>{prob?.tags}</div> )}
                              
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const getDifficultyBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "badge-success";
    case "medium":
      return "badge-warning";
    case "hard":
      return "badge-error";
    default:
      return "badge-neutral";
  }
};

export default HomePage;
