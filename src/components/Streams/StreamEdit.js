import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../store/actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    console.log(1);
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.stream, 'title', 'description')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    // currentUserId: state.auth.userId,
    // isSignedIn: state.auth.isSignedIn, // can also userId to infer
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
