import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import TopNavBar from "../NavigationBar/TopNavBar";
import TaskListForm from "../Forms/TaskListForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PopOutTaskDetails from "../PopOutMenu/PopOutTaskDetails";
import { Context as TaskContext } from "../../context/store/TaskStore";

import "../../css/Project.css";
import "../../css/TaskList.css";
import ColumnTasklist from "../tasks/ColumnTasklist";
import Add from "../../assets/Add";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    display: "flex",
    borderRadius: "10px"
  }
});

const AdminProjectPage = ({ sidebar }) => {
  const classes = useStyles();

  //   const { projectId, projectName, teamId } = useParams();
  const projectId = 1;
  const projectName = "Database Project";
  const teamId = 1;

  const [taskState, taskdispatch] = useContext(TaskContext);
  const [openTasklistForm, setOpenTasklistForm] = useState(false);
  const [tasks, setTasks] = useState();
  const [project, setProject] = useState();
  const [tasklists, setTasklists] = useState();

  //Side Menus
  const [sideTaskForm, setSideTaskForm] = useState(false);
  const [sideTasklistForm, setSideTasklistForm] = useState(false);
  const [sideTaskDetails, setSideTaskDetails] = useState(false);

  const showSideTaskForm = () => {
    setSideTaskDetails(false);
    setSideTasklistForm(false);
    setSideTaskForm(!sideTaskForm);
  };

  const showSideTaskDetails = () => {
    setSideTasklistForm(false);
    setSideTaskForm(false);
    setSideTaskDetails(!sideTaskDetails);
  };

  //Task through get /project/id/taskslists. Set here so we can refer to it in the ondragend funnction
  const [loading, setLoading] = useState(true);

  const getProject = async () => {
    try {
      const res = await apiServer.get(`/project/${projectId}`);
      // await getTasklists();
      const resp = await apiServer.get(`/project/${projectId}/tasklists`);
      setProject(res.data);
      setTasklists(resp.data);
      // console.log(tasklists);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProject();
    taskdispatch({ type: "get_selected_task", payload: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProject, setTasklists, setTasks]);

  if (loading) {
    return <Loader />;
  }

  const renderedTasklists = tasklists.map((tasklist, index) => {
    return (
      <ColumnTasklist
        key={index}
        tasklist={tasklist}
        index={index}
        setTasklists={setTasklists}
        showSideTaskDetails={showSideTaskDetails}
        sideTaskDetails={sideTaskDetails}
        showSideTaskForm={showSideTaskForm}
        addButtonVisible={false}
      />
    );
  });

  const myboxStyle = {
    width: "20%",
    backgroundColor: "#c7c7c745"
  }

  const myCardContentStyle = {
    width: "80%"
  }

  const render_projectDetail = () => (
    <div className="project-page-admin-container">
      <div className="project-page-main-content">
        <Card className={classes.root}>
          <Box sx={{ display: "flex", flexDirection: "column" }} style={myboxStyle}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                CardContent example
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                This Card's children are wrapped in a CardContent component,
                which adds 16px of padding around the edges. The last
                CardContent in a group of children will get 24px of padding on
                the bottom.
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                This Card's children are wrapped in a CardContent component,
                which adds 16px of padding around the edges. The last
                CardContent in a group of children will get 24px of padding on
                the bottom.
              </Typography>
            </CardContent>
          </Box>
          <CardContent style={myCardContentStyle}>
            <DragDropContext>
              <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
              >
                {(provided) => (
                  <div
                    className="project-admin-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {renderedTasklists}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>

        {sideTaskDetails && taskState.selectedTask ? (
          <PopOutTaskDetails
            showSideTaskDetails={showSideTaskDetails}
            sideTaskDetails={sideTaskDetails}
          />
        ) : null}
      </div>
    </div>
  );

  //----------------------------------------------Project
  return <>{render_projectDetail()}</>;
};

export default AdminProjectPage;
