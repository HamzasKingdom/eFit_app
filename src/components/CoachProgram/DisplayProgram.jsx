import React from "react";
import {
  Collapse,
  Table,
  Row,
  Col,
  Button,
  Modal,
  Tabs,
  Icon,
  Avatar,
  Tag
} from "antd";
import "./CoachProgram.css";
import Spinner from "../Global/Spinner";
import SessionModal from "./SessionModal";
import * as programScripts from "../../utils/programScripts";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const columns = [
  {
    title: "Exercise",
    dataIndex: "exercise.name",
    align: "center"
  },
  {
    title: "SetsXReps or Time",
    dataIndex: "sets",
    render: (text, row) => {
      {
        if (row.sets != null) {
          return row.sets + "X" + row.reps;
        } else {
          return row.time + " seconds";
        }
      }
    },
    align: "center"
  }
];

const columnsResults = [
  {
    title: "Exercise",
    dataIndex: "exercise.name"
  },
  {
    title: "Performance",
    dataIndex: "performance",
    render: text => {
      if (parseInt(text) == 0) {
        return (
          <div>
            <Tag color={"gold"}>Normal</Tag>
          </div>
        );
      } else if (parseInt(text) == 1) {
        return (
          <div>
            <Tag color={"green"}>Easy</Tag>
          </div>
        );
      } else {
        return (
          <div>
            <Tag color={"red"}>Difficult</Tag>
          </div>
        );
      }
    }
  }
];

const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 10,
  border: 0,
  overflow: "hidden"
};

class DisplayProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      displaySessionModal: false,
      selectedSession: {
        periods: [{}],
        exercises: [{}]
      },
      isNewSession: false,
      index: 0,
      originalIndex: 0
    };
  }

  handleChangeSession = (name, value) => {
    const { selectedSession } = this.state;
    this.setState({
      selectedSession: {
        ...selectedSession,
        [name]: value
      }
    });
  };

  handleChangeSessionPeriods = (index, name, value) => {
    const { selectedSession } = this.state;
    const { periods } = selectedSession;
    periods[index] = {
      ...periods[index],
      [name]: value
    };
    this.setState({
      selectedSession: {
        ...selectedSession,
        periods
      }
    });
  };

  handleAddPeriod = () => {
    const { selectedSession } = this.state;
    let { periods } = selectedSession;
    if (periods) {
      periods.push({});
    } else {
      periods = [{}];
    }
    this.setState({
      selectedSession: {
        ...selectedSession,
        periods
      }
    });
  };

  handleDeletePeriod = i => {
    const { selectedSession } = this.state;
    const { periods } = selectedSession;
    periods.splice(i, 1);
    this.setState({
      selectedSession: {
        ...selectedSession,
        periods
      }
    });
  };

  handleChangeSessionExercises = (index, name, value) => {
    const { selectedSession } = this.state;
    const { exercises } = selectedSession;
    exercises[index] = {
      ...exercises[index],
      [name]: value
    };
    this.setState({
      selectedSession: {
        ...selectedSession,
        exercises
      }
    });
  };

  handleAddExercise = () => {
    const { selectedSession } = this.state;
    let { exercises } = selectedSession;
    if (exercises) {
      exercises.push({});
    } else {
      exercises = [{}];
    }
    this.setState({
      selectedSession: {
        ...selectedSession,
        exercises
      }
    });
  };

  handleDeleteExercise = i => {
    const { selectedSession } = this.state;
    const { exercises } = selectedSession;
    exercises.splice(i, 1);
    this.setState({
      selectedSession: {
        ...selectedSession,
        exercises
      }
    });
  };

  handleChangeIndex = index => {
    this.setState({ index });
  };

  showResultsModal = selectedPeriod => {
    this.setState({
      visible: true,
      selectedPeriod
    });
  };

  showSessionModal = (selectedSession, index) => {
    this.setState({
      selectedSession: selectedSession || {
        periods: [{}],
        exercises: [{}]
      },
      index,
      originalIndex: index,
      isNewSession: !selectedSession,
      displaySessionModal: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  formatDate = rawDate => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];

    const d = new Date(rawDate);
    const day = d.getDate();
    const monthIndex = d.getMonth();
    return `${day}/${monthNames[monthIndex]}`;
  };

  sessionEndDate = (session, sessionStartDate) => {
    let totalDays = 0;
    for (let j = 0; j < session.periods.length; j += 1) {
      totalDays += parseInt(session.periods[j].nb_days, 10);
    }
    return this.formatDate(
      programScripts.addDaysDate(sessionStartDate, totalDays)
    );
  };

  periodEndDate = (periodLength, periodStartDate) =>
    this.formatDate(programScripts.addDaysDate(periodStartDate, periodLength));

  sessionLength = periods => {
    let length = 0;
    for (let j = 0; j < periods.length; j += 1) {
      length += parseInt(periods[j].nb_days, 10);
    }
    return length;
  };

  sessionStartDate = (programStartDate, sessionsArray, currentSessionIndex) => {
    let daysToSum = 0;
    for (let i = 0; i < currentSessionIndex; i += 1) {
      daysToSum =
        daysToSum + 1 + this.sessionLength(sessionsArray[i].periods) + 1;
    }
    const newDate = programScripts.addDaysDate(programStartDate, daysToSum);
    return this.formatDate(newDate);
  };

  periodStartDate = (programStartDate, periodsArray, periodIndex) => {
    let daysToSum = 0;
    for (let j = 0; j < periodIndex; j += 1) {
      daysToSum = daysToSum + 1 + parseInt(periodsArray[j].nb_days, 10);
    }
    const newDate = programScripts.addDaysDate(
      this.sessionStartDate(programStartDate),
      daysToSum
    );
    return this.formatDate(newDate);
  };

  renderPeriod = (session, period, index, startDate, periodsArray) => (
    <Panel
      header={
        <div className="margin0">
          <Row>
            <Col span={8}>
              <p className="margin0">
                <strong>Period {index + 1}</strong>
              </p>
            </Col>
            <Col span={8}>
              <p className="margin0">
                <strong>
                  <img
                    alt=""
                    className="calendar"
                    src="/assets/images/update.svg"
                  />
                  Reps:{" "}
                </strong>
                {programScripts.completedReps(period.repetitions)}/
                {period.nb_repetitions}
              </p>
            </Col>
            <Col span={8}>
              <p className="margin0">
                <img
                  alt=""
                  className="calendar"
                  src="/assets/images/calendar.svg"
                />
                {this.periodStartDate(startDate, periodsArray, index)} -{" "}
                {this.periodEndDate(
                  period.nb_days,
                  this.periodStartDate(startDate, periodsArray, index)
                )}
              </p>
            </Col>
          </Row>
        </div>
      }
      key={index}
      style={customPanelStyle}
    >
      <Table
        className="exercisesTable"
        pagination={false}
        columns={columns}
        dataSource={session.exercises}
        size="middle"
      />
      <Row className="period_btns">
        <Col offset={6} span={12}>
          {this.renderResultsButton(period)}
        </Col>
      </Row>
    </Panel>
  );

  renderResultsButton = period => {
    if (period.repetitions === null || period.repetitions.length === 0) {
      return (
        <Button
          className="results_btn"
          disabled
          onClick={this.showResultsModal}
          block
        >
          No Results Available
        </Button>
      );
    } else {
      return (
        <Button
          className="results_btn"
          onClick={() => this.showResultsModal(period)}
          block
        >
          See Results
        </Button>
      );
    }
  };

  renderRep = (rep, index) => (
    <TabPane tab={`Rep${index + 1}`} key={index}>
      {console.log(rep)}
      <h3>Completed on: {programScripts.formatDate(rep.date)}</h3>
      <Table
        className="exercisesTable"
        pagination={false}
        columns={columnsResults}
        dataSource={rep.results}
        size="small"
        bordered={false}
      />
      <br />
    </TabPane>
  );

  returnIndexCurrentSession = sessions => {
    var index = 0;
    for (var i = 0; i < sessions.length; i++) {
      if (
        programScripts.sessionStatus(sessions[i].periods).status ==
        "In progress"
      ) {
        index = i;
      }
    }
    return index;
  };
  returnIndexCurrentPeriod = periods => {
    var index = 0;
    if (periods != null || periods.length > 0) {
      for (var i = 0; i < periods.length; i++) {
        if (
          programScripts.status(
            programScripts.completedReps(periods[i].repetitions),
            periods[i].nb_repetitions
          ) == "In progress"
        ) {
          index = i;
        }
      }
    }
    return index;
  };

  renderSession = (session, index, programStartDate, sessionsArray) => (
    <Panel
      header={
        <div className="margin0">
          <Row>
            <Col span={8}>
              <p className="margin0">
                <strong>{session.name}</strong>
              </p>
            </Col>
            <Col span={8}>
              <p className="margin0">
                <strong>Status:</strong>{" "}
                {programScripts.sessionStatus(session.periods).status}
              </p>
            </Col>
            <Col span={8}>
              <p className="margin0">
                {/*<img
                  alt=""
                  className="calendar"
                  src="/assets/images/calendar.svg"
                />
                {this.sessionStartDate(programStartDate, sessionsArray, index)}{" "}
                -{" "}
                {this.sessionEndDate(
                  session,
                  this.sessionStartDate(programStartDate, sessionsArray, index)
                )*/}
              </p>
            </Col>
          </Row>
        </div>
      }
      key={index}
    >
      <Collapse
        defaultActiveKey={[this.returnIndexCurrentPeriod(session.periods)]}
        bordered={false}
      >
        {session.periods.map((period, pindex) =>
          this.renderPeriod(
            session,
            period,
            pindex,
            this.sessionStartDate(programStartDate, sessionsArray, index),
            session.periods
          )
        )}
      </Collapse>

      <Row>
        <Col offset={8} span={4}>
          <Button
            className="results_btn"
            onClick={() => this.showSessionModal(session, index)}
            block
          >
            Edit Session
          </Button>
        </Col>
        <Col span={4}>
          <Button
            className="delete_session_btn"
            type="danger"
            onClick={() => this.showSessionModal(session, index)}
            block
          >
            Delete Session
          </Button>
        </Col>
      </Row>
    </Panel>
  );

  renderProgram = program => (
    <div>
      <h1 className="program_name">{program.name || program.program.name}</h1>

      <Collapse
        defaultActiveKey={[this.returnIndexCurrentSession(program.sessions)]}
      >
        {program.sessions.map((session, index) =>
          this.renderSession(
            session,
            index,
            program.creation_date,
            program.sessions
          )
        )}
      </Collapse>
      <Row className="period_btns">
        <Col offset={7} span={10}>
          <Button
            onClick={() => this.showSessionModal(null)}
            className="results_btn"
            type="primary"
            block
          >
            <Icon type="plus" /> Add session
          </Button>
        </Col>
      </Row>
    </div>
  );

  render() {
    const { program, onSubmitSession } = this.props;
    const {
      displaySessionModal,
      selectedSession,
      index,
      isNewSession,
      originalIndex,
      selectedPeriod
    } = this.state;

    console.log("Program", program);
    return (
      <div>
        {program ? (
          <div>
            {this.renderProgram(program)}
            <SessionModal
              displaySessionModal={displaySessionModal}
              onSubmitSession={(session, i) =>
                onSubmitSession(session, i, originalIndex, isNewSession)
              }
              selectedSession={selectedSession}
              sessions={program.sessions || program.program.sessions}
              index={index}
              onCancel={() => this.setState({ displaySessionModal: false })}
              onChangeSession={this.handleChangeSession}
              onChangeSessionPeriods={this.handleChangeSessionPeriods}
              onAddPeriod={this.handleAddPeriod}
              onDeletePeriod={this.handleDeletePeriod}
              onChangeIndex={this.handleChangeIndex}
              onChangeSessionExercises={this.handleChangeSessionExercises}
              onAddExercise={this.handleAddExercise}
              onDeleteExercise={this.handleDeleteExercise}
              isNewSession={isNewSession}
            />
            {selectedPeriod ? (
              <Modal
                title="Period Results"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                {selectedPeriod.repetitions ? (
                  <Tabs defaultActiveKey="0">
                    {selectedPeriod.repetitions.map((rep, rIndex) =>
                      this.renderRep(rep, rIndex)
                    )}
                  </Tabs>
                ) : (
                  <p>No Results Available</p>
                )}
              </Modal>
            ) : null}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default DisplayProgram;
