import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// Components
import Todo from "./Todo";

// OTHERS
import { useTodos , useTodosDispatch } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";
import { useState, useEffect, useMemo  } from "react";

export default function TodoList() {

  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const {showHideToast} = useToast();

  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [dialogTodo , setDialogeTodo] = useState("");

  // filteration arrays
  const completedTodos = useMemo(()=>{
    return todos.filter((t) => {
      return t.isCompleted;
    });
  },[todos]);

  const notCompletedTodos =useMemo(()=>{
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  },[todos]);

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }
  
  useEffect(() => {
    dispatch(
      {
        type : "get"
      }
    )
  }, []);
  
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  //  Handelers
  function handleAddClick() {
    dispatch(
      {
        type : "added" ,
        payload : {
        title : titleInput
      }}
    )
    setTitleInput("");
    showHideToast("Added Done")
  }
  
  function openDeleteDialog (todo) {
    setDialogeTodo(todo)
    setShowDeleteDialog(true)
  }

  function handleDeleteDialogClose () {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispatch(
      {
        type : "delete",
        payload : dialogTodo
      }
    )
    handleDeleteDialogClose()
    showHideToast("Deleted Done")

  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    dispatch(
      {
        type : "updated" ,
        payload : dialogTodo
      }
    )
    setShowUpdateDialog(false);
    showHideToast("Updated")
  }

  function openEditDialog(todo) {
    setDialogeTodo(todo)
    setShowUpdateDialog(true);
    
  }
  
  // =========== Handelers ============

  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} showDelete={openDeleteDialog} showEdit={openEditDialog}/>;
  });

  return (
    <>
     {/* DELETE DIALOG */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* === DELETE DIALOG === */}

      {/* UPDATE DIALOG */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogeTodo({ ...dialogTodo, title: e.target.value });
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={dialogTodo.details}
            onChange={(e) => {
              setDialogeTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* === UPDATE DIALOG */}

      <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh",
          overflow: "scroll",
        }}
      >
        <CardContent>
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider />

          {/* FILTER BUTTONS */}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* ==== FILTER BUTTON ==== */}

          {/* ALL TODOS */}
          {todosJsx}
          {/* === ALL TODOS === */}

          {/* INPUT + ADD BUTTON */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              xs={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>

            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length === 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
          {/*== INPUT + ADD BUTTON ==*/}
        </CardContent>
      </Card>
    </Container>
    </>

  );
}
