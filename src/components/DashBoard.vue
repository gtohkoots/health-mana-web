<template>
<div class="container">
    <div class="d-sm-flex align-items-center mb-4">
        <h3 class="text-dark mb-0">Covid Case Tracker For Virginia</h3>
    </div>
    <div class="row">
        <div class="col-6">
            <div class="card shadow border-start-primary py-2">
                <div class="card-body">
                    <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                            <div class="text-uppercase text-danger fw-bold text-xs mb-1"><span>Total Covid Cases</span></div>
                            <div class="text-dark fw-bold h5 mb-0"><span>693000</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card shadow border-start-success py-2">
                <div class="card-body">
                    <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                            <div class="text-uppercase text-dark fw-bold text-xs mb-1"><span>Total Covid Death</span></div>
                            <div class="text-dark fw-bold h5 mb-0"><span>11525</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card shadow border-start-info py-2">
                <div class="card-body">
                    <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                            <div class="text-uppercase text-info fw-bold text-xs mb-1"><span>Fully Vaccinated Rate</span></div>
                            <div class="row g-0 align-items-center">
                                <div class="col-auto">
                                    <div class="text-dark fw-bold h5 mb-0 me-3"><span>54.3%</span></div>
                                </div>
                                <div class="col">
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style="width: 54.3%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto"><i class="fas fa-clipboard-list fa-2x text-gray-300"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card shadow border-start-primary py-2">
                <div class="card-body">
                    <div class="row align-items-center no-gutters">
                        <div class="col me-2">
                            <div class="text-uppercase text-danger fw-bold text-xs mb-1"><span>Vaccination Sites Available</span></div>
                            <div class="text-dark fw-bold h5 mb-0"><span>8</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-8">
            <div class="card shadow">
                <div class="card-header py-2">
                    <h4 class="text-dark fw-bold m-0">Covid Case Trend</h4>
                </div>
                <div class="card-body">
                    <h6 class="text-info fw-bold">
                        Monday
                        <span class="float-end">100</span>
                    </h6>
                    <div class="progress mb-4">
                        <div class="progress-bar bg-danger" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 50%;"></div>
                    </div>
                    <h6 class="text-info fw-bold">
                        Tuesday
                        <span class="float-end">100</span>
                    </h6>
                    <div class="progress mb-4">
                        <div class="progress-bar bg-danger" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 50%;"></div>
                    </div>
                    <h6 class="text-info fw-bold">
                        Wednesday
                        <span class="float-end">100</span>
                    </h6>
                    <div class="progress mb-4">
                        <div class="progress-bar bg-danger" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 50%;"></div>
                    </div>
                    <h6 class="text-info fw-bold">
                        Thursday
                        <span class="float-end">100</span>
                    </h6>
                    <div class="progress mb-4">
                        <div class="progress-bar bg-danger" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 50%;"></div>
                    </div>
                    <h6 class="text-info fw-bold">
                        Friday
                        <span class="float-end">100</span>
                    </h6>
                    <div class="progress mb-4">
                        <div class="progress-bar bg-danger" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 50%;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.col-6 {
    margin-bottom: 20px;
}
.float-end {
    float: right;
}
</style>