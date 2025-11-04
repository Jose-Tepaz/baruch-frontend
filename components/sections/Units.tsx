'use client';
import { useState } from 'react';
import { useTranslation } from "@/utils/i18n-simple";
import { Unit } from "@/types/property";

export default function Units({ units }: { units?: Unit[] }) {
    const { t } = useTranslation();
  
    
    // Si no hay unidades, mostrar mensaje
    if (!units || !Array.isArray(units) || units.length === 0) {
        return (
            <div className="units-section">
               
            </div>
        );
    }

    const handleViewPlan = (unit: Unit) => {
        if (unit.floor?.url) {
            window.open(unit.floor.url, '_blank');
        } else {
            console.log('No hay plano disponible para esta unidad');
        }
    };

    return (
        
        <div className="">
            <div className="">
                <div className="row">
                    <div className="col-12">
                        <div className="units-table-wrapper">
                            {/* Tabla para pantallas grandes */}
                            <div className="table-responsive d-none d-lg-block">
                                <table className="table table-hover units-table">
                                    <thead> 
                                        <tr>
                                            <th className='text-size-smaill text-weight-medium'>{t('propertyDetails.units.id-house')}</th>
                                            <th className='text-size-smaill text-weight-medium'>{t('propertyDetails.units.dorms')}</th>
                                            <th className='text-size-smaill text-weight-medium'>{t('propertyDetails.units.bathrooms')}</th>
                                            <th className='text-size-smaill text-weight-medium'>{t('propertyDetails.units.built-area')}</th>
                                            <th className='text-size-smaill text-weight-medium'>{t('propertyDetails.units.exterior-area')}</th>
                                            <th className='text-size-smaill text-weight-medium'>{t('propertyDetails.units.garage')}</th>
                                            <th className='text-size-smaill text-weight-medium'>{t('propertyDetails.units.storage_room')}</th>
                                            <th className='text-size-smaill text-weight-medium'>{t('propertyDetails.units.price')}</th>
                                            <th className='text-size-smaill text-weight-medium'>{t('propertyDetails.units.floor')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {units.map((unit) => (
                                            <tr key={unit.id}>
                                                <td className="dwelling-cell">
                                                    <strong>{unit.housing_number}</strong>
                                                </td>
                                                <td className="bedrooms-cell">
                                                    {unit.bedrooms}
                                                </td>
                                                <td className="bathrooms-cell">
                                                    {unit.bathrooms}
                                                </td>
                                                <td className="built-area-cell">
                                                    {unit.built_area} m²
                                                </td>
                                                <td className="exterior-area-cell">
                                                    {unit.exterior_area} m²
                                                </td>
                                                <td className="garage-cell">
                                                    <span className={`badge ${unit.garage ? 'badge-available' : 'badge-unavailable'}`}>
                                                        {unit.garage ? t('propertyDetails.units.is_available') : t('propertyDetails.units.is_not_available')}
                                                    </span>
                                                </td>
                                                <td className="storage-cell">
                                                    <span className={`badge ${unit.storage_room ? 'badge-available' : 'badge-unavailable'}`}>
                                                        {unit.storage_room ? t('propertyDetails.units.is_available') : t('propertyDetails.units.is_not_available')}
                                                    </span>
                                                </td>
                                                <td className="price-cell">
                                                    <strong>€ {unit.price ? Number(unit.price).toLocaleString('de-DE') : ''}</strong>
                                                </td>
                                                <td className="plan-cell">
                                                    <button
                                                        className="btn btn-dark btn-sm"
                                                        onClick={() => handleViewPlan(unit)}
                                                        disabled={!unit.floor || !unit.is_available}
                                                    >
                                                        {(!unit.floor || !unit.is_available) ? t('propertyDetails.units.unavailable') : t('propertyDetails.units.floor')}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Cards para pantallas pequeñas */}
                            <div className="d-lg-none">
                                {units.map((unit) => (
                                    <div key={unit.id} className="card mb-3 unit-card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <h6 className="card-title mb-2">
                                                        <strong>{unit.housing_number}</strong>
                                                    </h6>   
                                                    <p className="card-text mb-1">
                                                        <small className="text-muted">
                                                            {t('propertyDetails.units.dorms')}: {unit.bedrooms}
                                                        </small>
                                                    </p>
                                                    <p className="card-text mb-1">
                                                        <small className="text-muted">
                                                            {t('propertyDetails.units.bathrooms')}: {unit.bathrooms}
                                                        </small>
                                                    </p>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <h6 className="text-color-black mb-2">
                                                        <strong>€ {unit.price ? Number(unit.price).toLocaleString('de-DE') : ''}</strong>
                                                    </h6>
                                                    <button
                                                        className="btn btn-dark btn-sm"
                                                        onClick={() => handleViewPlan(unit)}
                                                        disabled={!unit.floor || !unit.is_available}
                                                    >
                                                        {(!unit.floor || !unit.is_available) ? t('propertyDetails.units.unavailable') : t('propertyDetails.units.floor')}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <p className="col-6 text-muted">
                                                    <small className="text-muted">
                                                        {t('propertyDetails.units.built-area')}: {unit.built_area} m²
                                                    </small>
                                                </p>
                                                <p className="col-6 text-muted">
                                                    <small className="text-muted">
                                                        {t('propertyDetails.units.exterior-area')}: {unit.exterior_area} m²
                                                    </small>
                                                </p>
                                            </div>
                                            <div className="row mt-1">
                                                <p className="col-6 text-muted">
                                                    <small className="text-muted">
                                                        {t('propertyDetails.units.garage')}: <span className={`badge ${unit.garage ? 'badge-available' : 'badge-unavailable'}`}>
                                                            {unit.garage ? t('propertyDetails.units.is_available') : t('propertyDetails.units.is_not_available')}
                                                        </span>
                                                    </small>
                                                </p>
                                                <p className="col-6 text-muted">
                                                    <small className="text-muted">
                                                        {t('propertyDetails.units.storage_room')}: <span className={`badge ${unit.storage_room ? 'badge-available' : 'badge-unavailable'}`}>
                                                            {unit.storage_room ? t('propertyDetails.units.is_available') : t('propertyDetails.units.is_not_available')}
                                                        </span>
                                                    </small>    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>      

            <style jsx>{`
            .table-responsive{
            border: 1px solid #eaeaea;
            }
                .units-section {
                    padding: 2rem 0;
                    background-color: #f8f9fa;
                }

                .badge-available {
                    background-color:var(--ztc-bg-bg-3) !important;
                    color: white !important;
                }

                .badge-unavailable {
                    background-color: #6c757d !important;
                    color: white !important;
                }

                .units-table-wrapper {
                    background: white;
                    border-radius: 8px;
                   
                    overflow: hidden;
                   
                    
                }

                .units-table {
                    margin-bottom: 0;
                }

                .units-table thead th {
                    background-color:var(--ztc-bg-bg-3);
                    color: white;
                    border: none;
                    padding: 1rem 0.75rem;
                    font-weight: 600;
                    text-align: center;
                }

                .units-table tbody td {
                    padding: 1rem 0.75rem;
                    vertical-align: middle;
                    border-bottom: 1px solid #dee2e6;
                    text-align: center;
                }

                .units-table tbody tr:hover {
                    background-color: #f8f9fa;
                }

                .dwelling-cell {
                    text-align: left !important;
                    font-weight: 500;
                }

                .price-cell {
                    font-size: 1.1rem;
                }

                .unit-card {
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    transition: box-shadow 0.2s ease;
                }

                .unit-card:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .badge {
                    font-size: 0.75rem;
                }

                @media (max-width: 768px) {
                    .units-section {
                        padding: 1rem 0;
                    }
                    
                    .card-body {
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}
