package com.civicflow.civicflow_backend.model;

public enum IssueStatus {
    OPEN,        // newly created
    IN_PROGRESS, // being worked on
    RESOLVED,    // fixed successfully
    REJECTED     // issue closed without fixing
}

