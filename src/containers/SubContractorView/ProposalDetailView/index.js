import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NoSsr from '@material-ui/core/NoSsr';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

import ProposalDetailFiles from './ProposalDetailFiles';
import ProposalDetailOverview from './ProposalDetailOverview';
import { getProposalData } from '../../../actions/sub-actions';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: "10px 10px 10px 10px"
	},
	toolbarstyle: {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.primary.dark
	},
	waitingSpin: {
		position: "relative",
		left: "calc(50% - 10px)",
		top: "calc(40vh)",
	}
});

class ConnectedProposalDetailView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			curDetailTab: 0
		}
	}

	async componentDidMount() {
		const { match } = this.props;
		await this.props.getProposalData(match.params.id);
	}

	handleTabChange = (event, value) => {
		this.setState({
			curDetailTab: value
		});
	}

	render() {
		const { classes, match, proposal } = this.props;
		const curDetailTab = this.state.curDetailTab;

		if (proposal === null)
			return (
				<CircularProgress className={classes.waitingSpin} />
			);

		return (

			<NoSsr>
				<div className={classes.root}>
					<Paper square >
						<Tabs
							value={curDetailTab}
							onChange={this.handleTabChange}
							variant="scrollable"
							indicatorColor="primary"
							textColor="primary"
							scrollButtons="on"
							className={classes.toolbarstyle}
						>
							<Tab label="Detail" />
							<Tab label="Files" />
						</Tabs>

						{curDetailTab === 0 && <ProposalDetailOverview />}
						{curDetailTab === 1 && <ProposalDetailFiles />}
					</Paper>
				</div>
			</NoSsr>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getProposalData: (id) => dispatch(getProposalData(id))
	}
}

const mapStateToProps = state => {
	return {
		proposal: state.sub_data.proposal
	};
};

const ProposalDetailView = connect(mapStateToProps, mapDispatchToProps)(ConnectedProposalDetailView);

ProposalDetailView.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ProposalDetailView));