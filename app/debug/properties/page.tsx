import PropertiesDebug from '@/components/debug/PropertiesDebug';
import LanguageTest from '@/components/debug/LanguageTest';

export default function PropertiesDebugPage() {
  return (
    <div className="container py-4">
      <h1>Debug Dashboard</h1>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Language Test</h4>
            </div>
            <div className="card-body">
              <LanguageTest />
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Properties Debug</h4>
            </div>
            <div className="card-body">
              <PropertiesDebug />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 