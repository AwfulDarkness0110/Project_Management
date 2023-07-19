import React, { useContext, useState } from "react";
import moment from "moment";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { Context as TeamContext } from "../../context/store/TeamStore";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
// import createNotification from "../Notification/ApiNotification";
import "../../css/Forms.css";
// import { AlertContext } from "../../context/AlertContext";
const ProjectForm = ({
  handleNewClose,
  clickClose,
  open,
  setTeamProjects,
  showSideProjectForm,
}) => {
  // const { actions } = useContext(AlertContext);
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const [projectName, setProjectName] = useState();
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectPriority, setProjectPriority] = useState("");
  const [projectAcceptedDate, setProjectAcceptedDate] = useState();
  const [projectBudget, setProjectBudget] = useState("");
  const [projectMisc, setProjectMisc] = useState("");

  const [teamState, teamdispatch] = useContext(TeamContext);
  const [projectState, projectDispatch] = useContext(ProjectContext);

  const userId = localStorage.getItem("userId");

  const categories = ["CJB", "Self"];
  const priorities = [
    {
      name: "HIGH",
      color: "red",
    },
    {
      name: "MEDIUM",
      color: "green",
    },
    {
      name: "LOW",
      color: "yellow",
    },
  ];

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };
  const handleCategoryChange = (e) => {
    // setProjectName(e.target.value);
  };
  const handleAcceptedDateChange = (e) => {
    const newDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setProjectAcceptedDate(newDate);
    // console.log(newDate); //value picked from date picker
    // setProjectName(e.target.value);
  };
  const handleBudgetChange = (e) => {
    setProjectBudget(e.target.value);
  };
  const handleMiscChange = (e) => {
    setProjectMisc(e.target.value);
  };

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data) => {
    const {
      teamId,
      name,
      description,
      category,
      priority,
      accepted_date,
      budget,
      misc,
    } = data;

    apiServer
      .post(`/team/${teamId}/project/`, {
        name,
        userId,
        description,
        category,
        priority,
        accepted_date,
        budget,
        misc,
      })
      .then((data) => {
        console.log(`ProjectForm: ${data}`);
        // actions.addAlert({
        //   text: "Project Creation successfully",
        //   title: "Project Creation",
        //   type: "success",
        //   id: Date.now(), // lazy way of adding unique id per alert
        // });
      })
      .catch((err) => {
        // createNotification("success", `Project: ${name} creation is failed.`);
        console.log("err: ", err);
        // actions.addAlert({
        //   text: "Project Creation Failed",
        //   title: "Project Creation",
        //   type: "error",
        //   id: Date.now(), // lazy way of adding unique id per alert
        // });
      });

    //REFER TO THIS WHEN CHECKING FOR RERENDERING
    const res = await apiServer.get(`/project/user/${userId}`);
    await projectDispatch({ type: "get_user_projects", payload: res.data });
    const projectResponse = await apiServer.get(`/team/${teamId}`);
    // NOTE: One way this could work is if we recreate form for just team page add project form button
    // Will not work with top nav bar form
    // setTeamProjects(projectResponse.data.Projects);
    await teamdispatch({
      type: `get_team_projects${teamId}`,
      payload: projectResponse.data,
    });
    if (setTeamProjects) {
      const teamResponse = await apiServer.get(`/team/${teamId}`);
      setTeamProjects(teamResponse.data.Projects);
    }
    // window.location.reload();

    // clickClose();
    showSideProjectForm();
  };

  const clearError = () => {
    var teamSelect = document.getElementById("team-select");
    clearErrors(teamSelect.name);
  };

  // render teams
  const renderedTeams = teamState.teams.map((team, i) => {
    return (
      <option key={i} id={team.id} value={team.id}>
        {team.name}
      </option>
    );
  });

  // render categories
  const renderedCategories = categories.map((category, index) => {
    return (
      <option key={`category-${index}`} id={category} value={category}>
        {category}
      </option>
    );
  });

  // render priorities
  const renderedPriorities = priorities.map((priority, index) => {
    return (
      <option
        key={`priority-${index}`}
        id={priority.name}
        value={priority.name}
        // style={{ color: `${priority.color}` }}
      >
        {priority.name}
      </option>
    );
  });

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        {/* <h2 className="form-header">Add a Project</h2> */}
        <div className="form-top-container">
          <div className="form-section">
            {/* Project Name  */}
            <div className="label-container">
              <label className="form-label">Project Name</label>
            </div>
            <div className="input-container">
              <input
                name="name"
                type="text"
                placeholder={"Project Name"}
                className="form-input"
                // onChange={clearError}
                onChange={handleNameChange}
                onKeyPress={handleUserKeyPress}
                ref={register({ required: true })}
              ></input>
              {errors.name?.type === "required" && (
                <p className="error-message">Please fill out project name</p>
              )}
            </div>

            {/* Team Settings */}
            <div className="label-container">
              <label className="form-label">Team</label>
            </div>
            <div className="input-container">
              <select
                id="team-select"
                name="teamId"
                className="form-input"
                ref={register({ required: true })}
              >
                {renderedTeams}
              </select>
              {errors.teamId?.type === "required" && (
                <p className="error-message">Please choose a team</p>
              )}
            </div>

            {/* Project Description  */}
            <div className="label-container">
              <label className="form-label">Project Description</label>
            </div>
            <div className="input-container">
              <textarea
                name="description"
                className="form-input"
                onChange={handleDescriptionChange}
                ref={register({ required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="error-message">
                  Please describe Project Description
                </p>
              )}
            </div>

            {/* Project category */}
            <div className="label-container">
              <label className="form-label">Project Category</label>
            </div>
            <div className="input-container">
              <select
                id="category-select"
                name="category"
                className="form-input"
                ref={register({ required: true })}
              >
                {renderedCategories}
              </select>
              {errors.category?.type === "required" && (
                <p className="error-message">Please choose a Category</p>
              )}
            </div>

            {/* Project Priority */}
            <div className="label-container">
              <label className="form-label">Project Priority</label>
            </div>
            <div className="input-container">
              <select
                id="priority-select"
                name="priority"
                className="form-input"
                ref={register({ required: true })}
              >
                {renderedPriorities}
              </select>
              {errors.priority?.type === "required" && (
                <p className="error-message">Please choose a Priority.</p>
              )}
            </div>

            {/* Accepted Date  */}
            <div className="label-container">
              <label className="form-label">Accepted Date</label>
            </div>
            <div className="input-container">
              <input
                name="accepted_date"
                type="date"
                className="form-input"
                onChange={handleAcceptedDateChange}
                // onChange={handleNameChange}
                // onKeyPress={handleUserKeyPress}
                ref={register({ required: true })}
              ></input>
              {errors.accepted_date?.type === "required" && (
                <p className="error-message">Please fill out Accepted Date</p>
              )}
            </div>

            {/* Budget  */}
            <div className="label-container">
              <label className="form-label">Budget</label>
            </div>
            <div className="input-container">
              <input
                name="budget"
                type="text"
                className="form-input"
                // onChange={clearError}
                onChange={handleBudgetChange}
                // onKeyPress={handleUserKeyPress}
                ref={register({ required: true })}
              ></input>
              {errors.budget?.type === "required" && (
                <p className="error-message">
                  Please fill out Budget. e.g fixed $200, hourly $50, free
                </p>
              )}
            </div>

            {/* misc  */}
            <div className="label-container">
              <label className="form-label">MISC</label>
            </div>
            <div className="input-container">
              <textarea
                name="misc"
                className="form-input"
                onChange={handleMiscChange}
                ref={register({ required: true })}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="form-button-container">
          {/* marginLeft: "400px" */}
          <button
            className="cancel-button"
            onClick={showSideProjectForm}
            color="primary"
          >
            Cancel
          </button>
          <button
            className={
              projectName ? "submit-button enabled" : "submit-button disabled"
            }
            disabled={projectName ? false : true}
            type="submit"
          >
            Create Project
          </button>
        </div>
      </form>
    </>
    //   </Modal>
    // </div>
  );
};

export default ProjectForm;
