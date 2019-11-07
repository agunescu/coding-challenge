import React, { Component } from 'react';
import './reports.css';

class Reports extends Component {
    constructor() {
        super();
        this.state = {
            reports: []
        }
    }

    async componentDidMount() {
        const response = await fetch('/reports');
        const reports = await response.json();
        this.setState({ reports });
    }

    async fetchApi(url, id, ticketState) {
        const res = await fetch(url + id, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ticketState })
        });
        return await res.json();
    }

    onResolveTicket = (id) => {
        this.fetchApi('/reports/', id, 'CLOSED').then(data => {
            this.setState(({ reports }) => {
                reports.forEach((item, i) => {
                    if (item.payload.reportId === id) reports[i].state = 'CLOSED';
                });
    
                return {
                    reports
                };
            });
        });
    };

    onBlockTicket = (id) => {
        this.fetchApi('/reports/block/', id, 'BLOCKED').then(data => {
            this.setState(({ reports }) => {
                reports.forEach((item, i) => {
                    if (item.payload.reportId === id) reports[i].state = 'BLOCKED';
                });
    
                return {
                    reports
                };
            });
        });
    };

    render() {
        return (
            <div>
                <h2>Reports</h2>
                <ul>
                    {this.state.reports.map((report, i) =>
                        report.state !== 'CLOSED' &&
                            <li key={i}>
                                <div className="label">
                                    <div className="item">Id: { report.payload.reportId }</div>
                                    <div className="item">Type: { report.payload.reportType }</div>
                                    <div><button onClick={() => this.onBlockTicket(report.payload.reportId)}>Block</button></div>
                                </div>
                                <div className="label">
                                    <div className="item">State: { report.state }</div>
                                    <div className="item">Message: { report.payload.message }</div>
                                    <div><button onClick={() => this.onResolveTicket(report.payload.reportId)}>Resolve</button></div>
                                </div>
                                <a href="url">Details</a>
                            </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Reports;