<%--
  Created by IntelliJ IDEA.
  User: salarahmadi
  Date: 7/13/19
  Time: 19:54
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="sform" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<html>
<head>
    <meta name="_csrf" content="${_csrf.token}"/>
    <!-- default header name is X-CSRF-TOKEN -->
    <meta name="_csrf_header" content="${_csrf.headerName}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beatify Search</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Cabin:500" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/home.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/styles.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/search.css"/>"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css"/>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="<c:url value="/resources/stickyplayer/css/stickyaudioplayerjquery.min.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/niceselect/css/nice-select.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/plyr/dist/plyr.css"/>">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.js"
            integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.pjax/2.0.1/jquery.pjax.min.js"></script>
    <script src="<c:url value="/resources/niceselect/js/jquery.nice-select.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/loginscript.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/homescript.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/beatify.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/common.js"/>"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
            crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
            crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js"
            type="text/javascript"></script>
    <script src="<c:url value="/resources/plyr/dist/plyr.min.js"/>"></script>
</head>
<body>
<div class="static">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="navbar-brand">
            <a href="<c:url value="/home"/>">Beatify</a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse" style="text-align: center;">
            <ul id="navbarLinks" class="navbar-nav mr-auto" style="margin: auto;">
                <li class="nav-item">
                    <a class="nav-link" href="<c:url value="/home"/>">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<c:url value="/home/discover"/>">Discover<span
                            class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Search</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About Us</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <c:choose>
                        <c:when test="${not authenticated}">
                            <button id="userlogin" class="btn btn-warning" data-toggle="modal" data-target="#loginForm">
                                Login/Register
                            </button>
                        </c:when>
                        <c:otherwise>
                            <button id="userlogin" class="btn btn-primary" data-toggle="modal"
                                    data-target="#userProfile">${principal.firstName}&nbsp;${principal.lastName}</button>
                        </c:otherwise>
                    </c:choose>
                </li>
            </ul>
        </div>
    </nav>
    <div class="modal fade" id="playlist" tabindex="-1" role="dialog" aria-labelledby="confirm"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Playlist</h5>
                    <button type="button" class="close" style="padding-left: 0; margin-left: 0;" data-dismiss="modal">
                        &times;
                    </button>
                </div>
                <div class="modal-body">
                    <div class="column">
                        <div id="plwrap">
                            <ul id="plList"></ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="repeat" type="button" class="btn btn-info"><i class="fa fa-redo"></i>&nbsp;Repeat
                    </button>
                    <a href="#" id="shuffle" class="btn btn-default btn-danger"><i class="fas fa-random"></i>&nbsp;Shuffle</a>
                </div>
            </div>
        </div>
    </div>
    <c:choose>
        <c:when test="${not authenticated}">
            <div class="modal hide fade" id="loginForm" data-keyboard="false" data-backdrop="static"
                 tabindex="-1" role="dialog" aria-labelledby="confirm" aria-hidden="true">
                <div class="modal-dialog" id="login">
                    <div class="modal-content">
                        <div class="modal-header">
                            <ul class="nav nav-pills">
                                <li id="firstTab" class="nav-item nav-link">
                                    <a class="btn" data-toggle="tab" data-target="#tab1">Login</a>
                                </li>
                                <li id="secondTab" class="nav-item nav-link">
                                    <a class="btn" data-toggle="tab" data-target="#tab2">Sign up</a>
                                </li>
                            </ul>
                            <button type="button" class="close" style="padding-left: 0; margin-left: 0;"
                                    data-dismiss="modal">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="tabbable">
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab1">
                                        <h2>Log in with your email account</h2>
                                        <form role="form" action="<c:url value="/login"/>" method="post"
                                              style="text-align: center;" id="login-form" autocomplete="on">
                                            <div class="form-group">
                                                <label for="emailAddress" class="sr-only">Email Address</label>
                                                <input type="email" name="username" id="emailAddress"
                                                       class="form-control"
                                                       placeholder="Your E-mail Address">
                                            </div>
                                            <div class="form-group">
                                                <label for="password" class="sr-only">Password</label>
                                                <input type="password" name="password" id="password"
                                                       class="form-control"
                                                       placeholder="Your Password">
                                            </div>
                                            <div dir="ltr" class="pretty p-curve p-icon p-smooth"
                                                 style="margin-bottom: 20px;">
                                                <input type="checkbox" name="rememberMe"/>
                                                <div class="state p-primary">
                                                    <i class="icon fa fa-check"></i>
                                                    <label>Remember Me</label>
                                                </div>
                                            </div>
                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                            <input type="submit" id="btn-login" class="btn btn-success btn-lg btn-block"
                                                   value="Log in">
                                        </form>
                                    </div>
                                    <div class="tab-pane" id="tab2">
                                        <div class="container" style="margin-top: 0px !important;">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <sform:form method="post"
                                                                action="http://localhost:8080/beatify-web/signup"
                                                                modelAttribute="userDTO" id="signup-form">
                                                        <sform:input path="username" id="usernameSignup"
                                                                     cssClass="form-control" type="email"
                                                                     placeholder="Your Email Address"/>
                                                        <sform:errors path="username" cssClass="badge alert-danger"
                                                                      cssStyle="margin-top: 4px;"/>
                                                        <sform:input path="password" id="passwordSignup"
                                                                     cssClass="form-control" cssStyle="margin-top: 5px;"
                                                                     type="password"
                                                                     placeholder="Your Password"/>
                                                        <sform:errors path="password" cssClass="badge alert-danger"
                                                                      cssStyle="margin-top: 4px;"/>
                                                        <div class="row" style="margin-top: 5px; margin-bottom: 5px;">
                                                            <div class="col-md-6">
                                                                <sform:input path="firstName" id="firstName"
                                                                             cssClass="form-control"
                                                                             placeholder="First Name"/>
                                                                <sform:errors path="firstName"
                                                                              cssClass="badge alert-danger"
                                                                              cssStyle="margin-top: 4px;"/>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <sform:input path="lastName" id="lastName"
                                                                             cssClass="form-control"
                                                                             placeholder="Last Name"/>
                                                                <sform:errors path="lastName"
                                                                              cssClass="badge alert-danger"
                                                                              cssStyle="margin-top: 4px;"/>
                                                            </div>
                                                        </div>
                                                        <sform:input path="phoneNumber" id="phoneNumber"
                                                                     cssClass="form-control" type="text"
                                                                     placeholder="Phone Number"/>
                                                        <sform:select path="nationality" cssClass="wide"
                                                                      cssStyle="margin-bottom: 7px; margin-top: 5px;"
                                                                      title="Nationality">
                                                            <sform:option selected="true" disabled="true"
                                                                          value="0">Nationality</sform:option>
                                                            <c:forEach items="${countries}" var="country">
                                                                <sform:option
                                                                        value="${country}">${country}</sform:option>
                                                            </c:forEach>
                                                        </sform:select>
                                                        <div class="row col-md-12 btn"
                                                             style="margin-top: 7px;margin-left: auto; margin-right: auto">
                                                            <input type="hidden" name="${_csrf.parameterName}"
                                                                   value="${_csrf.token}"/>
                                                            <button class="btn btn-lg btn-primary btn-block"
                                                                    type="submit">Sign up
                                                            </button>
                                                        </div>
                                                    </sform:form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" class="forget" data-toggle="modal" data-target="#forget">Forgot your
                                password?</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="forget" tabindex="-1" role="dialog" aria-labelledby="confirm"
                 aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Password Recovery</h5>
                            <button type="button" class="close" style="padding-left: 0; margin-left: 0;"
                                    data-dismiss="modal">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <p style="text-align: center;">Recovery Email</p>
                            <input type="email" name="recovery-email" id="recovery-email" class="form-control"
                                   autocomplete="off">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success">Recovery</button>
                            <a href="<c:url value="/logout"/>" class="btn btn-default btn-danger">Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        </c:when>
        <c:otherwise>
            <div class="modal fade" id="userProfile" tabindex="-1" role="dialog"
                 aria-labelledby="confirm" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">User Profile</h5>
                            <button type="button" class="close" style="padding-left: 0; margin-left: 0;"
                                    data-dismiss="modal">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row" style="text-align: center;">
                                <label class="btn btn-primary btn-block"><i
                                        class="fas fa-list-ul"></i>Playlists&nbsp;${fn:length(principal.playlists.toArray())}
                                </label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info">Settings</button>
                            <a href="#" class="btn btn-default btn-danger" data-dismiss="modal">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </c:otherwise>
    </c:choose>
    <audio id="audio1"></audio>
</div>
<div class="dynamic">
    <div class="container" style="margin-top: 100px; text-align: center;">
        <div>
            <div class="searchbar">
                <input class="search_input" type="text" name="" placeholder="Search Anything...">
                <a class="search_icon"><i class="fas fa-search"></i></a>
            </div>
        </div>
        <hr>
        <h4>Songs</h4>
        <div class="row" style="text-align: center;">
            <c:set var="album" value="${featuredAlbumsPart1[0]}"/>
            <div class="col-4 float-left">
                <c:set var="albumCover" value="${album.albumArtURL}"/>
                <a href="<c:url value="/albums/${album.id}"/>">
                    <img class="img-fluid" data-target="${album.id}" style="cursor: pointer;" src="${albumCover}">
                </a>
                <div id="songName">
                    <span style="display: block;overflow: scroll;">${album.title}</span>
                </div>
            </div>
            <div class="col-4 float-left">
                <c:set var="albumCover" value="${album.albumArtURL}"/>
                <a href="<c:url value="/albums/${album.id}"/>">
                    <img class="img-fluid" data-target="${album.id}" style="cursor: pointer;" src="${albumCover}">
                </a>
                <div id="songName">
                    <span style="display: block;overflow: scroll;">${album.title}</span>
                </div>
            </div>
            <div class="col-4 float-left">
                <c:set var="albumCover" value="${album.albumArtURL}"/>
                <a href="<c:url value="/albums/${album.id}"/>">
                    <img class="img-fluid" data-target="${album.id}" style="cursor: pointer;" src="${albumCover}">
                </a>
                <div id="songName">
                    <span style="display: block;overflow: scroll;">${album.title}</span>
                </div>
            </div>
            <div class="col-4 float-left">
                <c:set var="albumCover" value="${album.albumArtURL}"/>
                <a href="<c:url value="/albums/${album.id}"/>">
                    <img class="img-fluid" data-target="${album.id}" style="cursor: pointer;" src="${albumCover}">
                </a>
                <div id="songName">
                    <span style="display: block;overflow: scroll;">${album.title}</span>
                </div>
            </div>
            <div class="col-4 float-left">
                <c:set var="albumCover" value="${album.albumArtURL}"/>
                <a href="<c:url value="/albums/${album.id}"/>">
                    <img class="img-fluid" data-target="${album.id}" style="cursor: pointer;" src="${albumCover}">
                </a>
                <div id="songName">
                    <span style="display: block;overflow: scroll;">${album.title}</span>
                </div>
            </div>
            <div class="col-4 float-left">
                <c:set var="albumCover" value="${album.albumArtURL}"/>
                <a href="<c:url value="/albums/${album.id}"/>">
                    <img class="img-fluid" data-target="${album.id}" style="cursor: pointer;" src="${albumCover}">
                </a>
                <div id="songName">
                    <span style="display: block;overflow: scroll;">${album.title}</span>
                </div>
            </div>
        </div>
        <a href="#" class="seeAll">See all</a>
        <hr>
    </div>
</div>
</body>
</html>
