import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";

function AdminPanel() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [homestay, setHomestay] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchPlace();
  }, []);

  const fetchPlace = async () => {
    const response = await axios
      .get("http://localhost:7000/admin/adminpanellist")
      .then((response) => {
        setHomestay(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/admin/deleted/${id}`);
      setHomestay(homestay.filter((place) => place._id !== id));
    } catch (error) {
      console.error("There was an error deleting the place:", error);
    }
  };

  const handleEdit = (id) => {
    // Use history.push to navigate
    history.push(`/adminpaneledit/${id}`);
  };

  return (
    <div className="admin-panel">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Admin Panel</Typography>
        </Toolbar>
      </AppBar>

      {matches ? (
        <List>
          {homestay.map((place) => (
            <ListItem key={place._id}>
              <ListItemAvatar>
                <Avatar
                  alt={place.name}
                  src={`http://localhost:7000/upload/${place.image}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={place.place}
                secondary={
                  `${place.details}, ${place.status} ` + ` ${place.description}`
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(place._id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(place._id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Paper className="admin-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Place</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {homestay.map((place) => (
                <TableRow key={place.id}>
                  <TableCell>
                    <img
                      alt={place.place}
                      src={`http://localhost:7000/upload/${place.image}`}
                      style={{ width: "150px", height: "150px" }}
                    />
                    <TableCell>{place.place}</TableCell>
                  </TableCell>
                  <TableCell>{place.details}</TableCell>
                  <TableCell>{place.status}</TableCell>
                  <TableCell>{place.description}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleEdit(place._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(place._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </div>
  );
}

export default AdminPanel;
