import React       from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table             from '@material-ui/core/Table';
import TableBody         from '@material-ui/core/TableBody';
import TableHead         from '@material-ui/core/TableHead';
import TableRow          from '@material-ui/core/TableRow';
import CircularProgress  from '@material-ui/core/CircularProgress';
import IconButton        from '@material-ui/core/IconButton';
import Dialog            from '@material-ui/core/Dialog';
import DialogActions     from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle       from '@material-ui/core/DialogTitle';
import DialogContent     from '@material-ui/core/DialogContent';
import Paper             from '@material-ui/core/Paper';
import { DropzoneDialog } from 'material-ui-dropzone';

import CustomSnackbar, { ISnackbarProps } from 'components/shared/CustomSnackbar';
import DeleteIcon          from '@material-ui/icons/Delete';
import NoteAddIcon         from '@material-ui/icons/NoteAdd';
import CustomTableCell     from 'components/shared/CustomTableCell';

import { getContractorDetailById, removeFile, uploadFiles } from 'store/actions/cont-actions';
import { FileInfo, MaterialThemeHOC, UserProfile }              from 'types/global';
import { compose }                                          from 'redux';
import styles                                               from './ProfileFileView.style'
import Button                                               from 'components/CustomButtons/Button';
interface ProfileFileViewProps extends MaterialThemeHOC {
  user: UserProfile;
  getContractorDetailById: (id: string) => any;
  uploadFiles: (id: string, file: string) => any;
  removeFile: (id: string, name: string) => any;
  files: FileInfo[];
}

interface ProfileFileViewState extends ISnackbarProps {
  openUploadForm: boolean;
  loading: boolean;
  busy: boolean;
  showConfirmDlg: boolean;
  nameToDel: string;
  saving: boolean;
}

class ProfileFileView extends React.Component<ProfileFileViewProps, ProfileFileViewState> {
  constructor(props: Readonly<ProfileFileViewProps>) {
    super(props);

    this.state = {
      openUploadForm: false,
      showMessage: false,
      loading: true,
      busy: false,
      message: '',
      variant: 'success',
      showConfirmDlg: false,
      nameToDel: '',
      saving: false,
      handleClose: this.closeMessage
    };
  }

  closeMessage = () => {
    this.setState({ showMessage: false });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    // let message = 'Loaded successfully.';
    let id = this.props.user.user_metadata.contractor_id;

    try {
      await this.props.getContractorDetailById(id);
    } catch (error) {
      // message = 'Some error occured.';
    }

    this.setState({
      openUploadForm: false,
      loading: false,
    });
  }

  handleUploadFiles = async files => {
    const { user } = this.props;
    this.setState({ busy: true });
    let id = user.user_metadata.contractor_id;

    try {
      await this.props.uploadFiles(id, files);
      await this.props.getContractorDetailById(id);
      this.setState({
        openUploadForm: false,
        busy: false,
        showMessage: true,
        message: 'Files were uploaded successfully.',
        variant: 'success'
      });
    } catch {
      this.setState({
        openUploadForm: false,
        busy: false,
        showMessage: true,
        message: 'Some error occured.',
        variant: 'error',
      });
    }
  };

  closeConfirmDialog = () => {
    this.setState({ showConfirmDlg: false });
  };

  handleDelete = name => {
    this.setState({ showConfirmDlg: true, nameToDel: name });
  };

  handleremoveFile = async () => {
    this.setState({ busy: true });
    let id = this.props.user.user_metadata.contractor_id;

    try {
      await this.props.removeFile(id, this.state.nameToDel);
      await this.props.getContractorDetailById(id);
      this.setState({
        openUploadForm: false,
        busy: false,
        showMessage: true,
        message: 'Files deleted successfully.',
        variant: 'success'
      });
    } catch (error) {
      this.setState({
        openUploadForm: false,
        busy: false,
        showMessage: true,
        message: 'Some error occured.',
        variant: 'error'
      });
    }
  };

  render() {
    const { classes, files, user } = this.props;
    // const projectFiles = selectedProject.projectFiles;

    if (this.state.loading)
      return (
        <div className={classes.root}>
          <CircularProgress className={classes.waitingSpin} />
        </div>
      );

    return (
      <Paper className={classes.root}>
        {this.state.busy && (
          <CircularProgress size={32} thickness={4} />
        )}
        <Table className={classes.relative} size="small">
          <TableHead>
            <TableRow>
              <CustomTableCell align="center">Name</CustomTableCell>
              <CustomTableCell align="center">
                <IconButton
                  className={classes.button}
                  aria-label="Add"
                  style={{ color: '#FFFFFF' }}
                  onClick={() => this.setState({ openUploadForm: true })}
                >
                  <NoteAddIcon />
                </IconButton>
              </CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map(row => (
              <TableRow className={classes.row} key={row.id} hover>
                <CustomTableCell component="th" scope="row" align="center">
                  <a
                    download={row.name}
                    href={
                      process.env.REACT_APP_PROJECT_API +
                      '/contractors/' +
                      user.user_metadata.contractor_id +
                      '/files/' +
                      row.name
                    }
                  >
                    {row.name}
                  </a>
                </CustomTableCell>
                <CustomTableCell align="center">
                  <IconButton
                    className={classes.button}
                    aria-label="Delete"
                    color="primary"
                    onClick={() => this.handleDelete(row.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DropzoneDialog
          open={this.state.openUploadForm}
          onSave={this.handleUploadFiles}
          maxFileSize={52428800}
          // showFileNamesInPreview={true}
          acceptedFiles={[
            'text/*,image/*,video/*,audio/*,application/*,font/*,message/*,model/*,multipart/*',
          ]}
          filesLimit={100}
          // dropzoneText="select files to upload(< 50mb)"
          // dropZoneClass={classes.dropzone}
          onClose={() => this.setState({ openUploadForm: false })}
        />
        <CustomSnackbar
          variant={this.state.variant}
          message={this.state.message}
          open={this.state.showMessage}
          handleClose={() => this.setState({ showMessage: false })}
        />
        <Dialog
          open={this.state.showConfirmDlg}
          onClose={this.closeConfirmDialog}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
          <DialogContent className={classes.relative}>
            {this.state.saving && (
              <CircularProgress
                size={32}
                thickness={4}
              />
            )}
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete this specialty?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeConfirmDialog} autoFocus>
              Cancel
            </Button>
            <Button onClick={this.handleremoveFile} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  files: state.cont_data.files,
  user: state.global_data.userProfile,
});
const mapDispatchToProps = {
  uploadFiles,
  getContractorDetailById,
  removeFile,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileFileView)
