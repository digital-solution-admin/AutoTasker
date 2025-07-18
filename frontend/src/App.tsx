import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { WorkflowBuilder } from './pages/WorkflowBuilder';
import { WorkflowList } from './pages/WorkflowList';
import { TemplateGallery } from './pages/TemplateGallery';
import { ServiceStatus } from './pages/ServiceStatus';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<WorkflowList />} />
            <Route path="/builder" element={<WorkflowBuilder />} />
            <Route path="/builder/:workflowId" element={<WorkflowBuilder />} />
            <Route path="/templates" element={<TemplateGallery />} />
            <Route path="/status" element={<ServiceStatus />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
