<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <div class="d-flex align-items-center ms-5"> 
                <router-link to="/mbx" class="navbar-brand"  style="font-size: x-large; font-weight: bolder;">壓鑄</router-link>
            <div class="dropdown ms-2">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                            作業自主巡迴檢查表
                        </a>
                        <ul class="dropdown-menu">
                            <router-link to="/machine" class="dropdown-item">1. 參數與設備檢查</router-link>
                            <router-link to="/appearance" class="dropdown-item">2. 外觀檢查</router-link>
                        </ul>
                        </li>

                    </ul>
                </div>
            </div> 
            </div>   
        </div>
    </nav>
</template>