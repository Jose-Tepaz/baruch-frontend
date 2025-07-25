'use client';
import { useTranslation } from "@/utils/i18n-simple";

export default function Faq1() {
    const { t, i18n } = useTranslation('common');

    return (
        <>
            {/*===== FAQ AREA STARTS =======*/}
            <div className="faq-inner-section-area sp1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-7 m-auto">
                            <div className="heading2 text-center space-margin60">
                                <h2>{t('faq.title')}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="faq-section-area">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="accordian-area">
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            {t('faq.question-1')}
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <p>{t('faq.answer-1')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space20" />
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                            {t('faq.question-2')}
                                                        </button>
                                                    </h2>
                                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <p>{t('faq.answer-2')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space20" />
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                            {t('faq.question-3')}
                                                        </button>
                                                    </h2>
                                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <p>{t('faq.answer-3')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space20" />
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                            {t('faq.question-4')}
                                                        </button>
                                                    </h2>
                                                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <p>{t('faq.answer-4')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space20" />
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                            {t('faq.question-5')}
                                                        </button>
                                                    </h2>
                                                    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                                <p>{t('faq.answer-5')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="accordian-area">
                                            <div className="accordion" id="accordionExample2">
                                                <div className="space24 d-lg-none d-block" />
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                                                            {t('faq.question-6')}
                                                        </button>
                                                    </h2>
                                                    <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                                                        <div className="accordion-body">
                                                                <p>{t('faq.answer-6')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space20" />
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                                                {t('faq.question-7')}
                                                        </button>
                                                    </h2>
                                                    <div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                                                        <div className="accordion-body">
                                                            <p>{t('faq.answer-7')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space20" />
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                                            {t('faq.question-8')}
                                                        </button>
                                                    </h2>
                                                    <div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                                                        <div className="accordion-body">
                                                            <p>{t('faq.answer-8')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space20" />
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                                            {t('faq.question-9')}
                                                        </button>
                                                    </h2>
                                                    <div id="collapseNine" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                                                        <div className="accordion-body">
                                                            <p>{t('faq.answer-9')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space20" />
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                                            {t('faq.question-10')}
                                                        </button>
                                                    </h2>
                                                    <div id="collapseTen" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                                                        <div className="accordion-body">
                                                            <p>{t('faq.answer-10')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== FAQ AREA ENDS =======*/}
        </>
    );
}
