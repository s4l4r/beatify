<%--
  Created by IntelliJ IDEA.
  User: salarahmadi
  Date: 8/30/18
  Time: 00:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="sform" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<c:choose>
    <c:when test="${pageContext.response.locale == 'ar'}">
        <c:set var="direction" value="rtl"/>
    </c:when>
    <c:otherwise>
        <c:set var="direction" value="ltr"/>
    </c:otherwise>
</c:choose>
<spring:message code="Login.EmailLabel" var="emailPlaceHolder"/>
<spring:message code="Login.PasswordLabel" var="passwordPlaceHolder"/>
<spring:message code="Login.FirstName" var="firstNamePlaceHolder"/>
<spring:message code="Login.LastName" var="lastNamePlaceHolder"/>
<spring:message code="Login.Nationality" var="nationalityPlaceHolder"/>

<html>
    <head>
        <meta name="signupSuccess" content="${signupSuccess}"/>
        <meta name="_csrf" content="${_csrf.token}"/>
        <!-- default header name is X-CSRF-TOKEN -->
        <meta name="_csrf_header" content="${_csrf.headerName}"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><spring:message code="Home.Title"/></title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Cabin:500" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/home.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/styles.css"/>">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css"/>
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" href="<c:url value="/resources/stickyplayer/css/stickyaudioplayerjquery.min.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/niceselect/css/nice-select.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/plyr/dist/plyr.css"/>">
        <script   src="https://code.jquery.com/jquery-3.3.1.js"   integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="   crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.pjax/2.0.1/jquery.pjax.min.js"></script>
        <script src="<c:url value="/resources/niceselect/js/jquery.nice-select.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/loginscript.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/homescript.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/beatify.js"/>"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js" type="text/javascript"></script>
        <script src="<c:url value="/resources/plyr/dist/plyr.min.js"/>"></script>
    </head>
    <body dir="${direction}">
    <div class="static">
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="navbar-brand">
                <a href="<c:url value="/home"/>"><spring:message code="App.Name"/></a>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse" style="text-align: center;">
                <ul id="navbarLinks" class="navbar-nav mr-auto" style="margin: auto;">
                    <li class="nav-item">
                        <a class="nav-link" href="<c:url value="/home"/>">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<c:url value="/home/discover"/>"><spring:message code="NavLinks.Discover"/><span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><spring:message code="NavLinks.Search"/></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><spring:message code="NavLinks.AboutUs"/></a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <c:choose>
                            <c:when test="${not authenticated}">
                                <button id="userlogin" class="btn btn-warning" data-toggle="modal" data-target="#loginForm"><spring:message code="NavLinks.Login"/></button>
                            </c:when>
                            <c:otherwise>
                                <button id="userlogin" class="btn btn-primary" data-toggle="modal" data-target="#userProfile">${principal.firstName}&nbsp;${principal.lastName}</button>
                            </c:otherwise>
                        </c:choose>
                    </li>
                </ul>
            </div>
        </nav>
        <div dir="${direction}" class="modal fade" id="playlist" tabindex="-1" role="dialog" aria-labelledby="confirm" aria-hidden="true">
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
                        <button id="repeat" type="button" class="btn btn-info"><i class="fas fa-redo"></i>&nbsp;Repeat</button>
                        <a href="#" id="shuffle" class="btn btn-default btn-danger"><i class="fas fa-random"></i>&nbsp;Shuffle</a>
                    </div>
                </div>
            </div>
        </div>
        <c:choose>
            <c:when test="${not authenticated}">
                <div dir="${direction}" class="modal hide fade" id="loginForm" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="confirm" aria-hidden="true">
                    <div class="modal-dialog" id="login">
                        <div class="modal-content">
                            <div class="modal-header">
                                <ul class="nav nav-pills">
                                    <li id="firstTab" class="nav-item nav-link">
                                        <a class="btn" data-toggle="tab" data-target="#tab1"><spring:message code="Login.Title"/></a>
                                    </li>
                                    <li id="secondTab" class="nav-item nav-link">
                                        <a class="btn" data-toggle="tab" data-target="#tab2"><spring:message code="Login.Signup"/></a>
                                    </li>
                                </ul>
                                <button type="button" class="close" style="padding-left: 0; margin-left: 0;" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="tabbable">
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="tab1">
                                            <h2><spring:message code="Login.LoginHeader"/></h2>
                                            <form role="form" action="<c:url value="/login"/>" method="post" style="text-align: center;" id="login-form" autocomplete="on">
                                                <div class="form-group">
                                                    <label for="emailAddress" class="sr-only"><spring:message code="Login.EmailLabel"/></label>
                                                    <input type="email" name="username" id="emailAddress" class="form-control" placeholder="<spring:message code="Login.EmailPlaceHolder"/>">
                                                </div>
                                                <div class="form-group">
                                                    <label for="password" class="sr-only"><spring:message code="Login.PasswordLabel"/></label>
                                                    <input type="password" name="password" id="password" class="form-control" placeholder="<spring:message code="Login.PasswordPlaceHolder"/>">
                                                </div>
                                                <div dir="ltr" class="pretty p-curve p-icon p-smooth" style="margin-bottom: 20px;">
                                                    <input type="checkbox" name="rememberMe"/>
                                                    <div class="state p-primary">
                                                        <i class="icon fa fa-check"></i>
                                                        <label><spring:message code="Login.RememberMeLabel"/></label>
                                                    </div>
                                                </div>
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                <input type="submit" id="btn-login" class="btn btn-success btn-lg btn-block" value="<spring:message code="Login.LoginButton"/>">
                                            </form>
                                        </div>
                                        <div class="tab-pane" id="tab2">
                                            <div class="container" style="margin-top: 0px !important;">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <sform:form method="post" action="http://localhost:8080/beatify/signup" modelAttribute="userDTO" id="signup-form">
                                                            <sform:input path="username" id="usernameSignup" cssClass="form-control" type="email" placeholder="${emailPlaceHolder}"/>
                                                            <sform:errors path="username" cssClass="badge alert-danger" cssStyle="margin-top: 4px;"/>
                                                            <sform:input path="password" id="passwordSignup" cssClass="form-control" cssStyle="margin-top: 5px;" type="password" placeholder="${passwordPlaceHolder}"/>
                                                            <sform:errors path="password" cssClass="badge alert-danger" cssStyle="margin-top: 4px;"/>
                                                            <div class="row" style="margin-top: 5px; margin-bottom: 5px;">
                                                                <div class="col-md-6">
                                                                    <sform:input path="firstName" id="firstName" cssClass="form-control" placeholder="${firstNamePlaceHolder}" pattern="^[a-zA-Z0-9$@$!%*?&#^-_. +]+$"/>
                                                                    <sform:errors path="firstName" cssClass="badge alert-danger" cssStyle="margin-top: 4px;"/>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <sform:input path="lastName" id="lastName" cssClass="form-control" placeholder="${lastNamePlaceHolder}"/>
                                                                    <sform:errors path="lastName" cssClass="badge alert-danger" cssStyle="margin-top: 4px;"/>
                                                                </div>
                                                            </div>
                                                            <sform:input path="phoneNumber" id="phoneNumber" cssClass="form-control" type="text" placeholder="Phone Number" />
                                                            <sform:select path="nationality" cssClass="wide" cssStyle="margin-bottom: 7px; margin-top: 5px;" title="${nationalityPlaceHolder}">
                                                                <sform:option value="0" selected="true" disabled="true">Nationality</sform:option>
                                                                <c:forEach items="${countries}" var="country">
                                                                    <sform:option value="${country}">${country}</sform:option>
                                                                </c:forEach>
                                                            </sform:select>
                                                            <div class="row col-md-12 btn" style="margin-top: 7px;margin-left: auto; margin-right: auto">
                                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                                                <button class="btn btn-lg btn-primary btn-block" type="submit"><spring:message code="Login.Signup"/></button>
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
                                <a href="#" class="forget" data-toggle="modal" data-target="#forget"><spring:message code="Login.ForgotLabel"/></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div dir="${direction}" class="modal fade" id="forget" tabindex="-1" role="dialog" aria-labelledby="confirm" aria-hidden="true">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title"><spring:message code="Login.RecoveryLabel"/></h5>
                                <button type="button" class="close" style="padding-left: 0; margin-left: 0;" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div class="modal-body">
                                <p style="text-align: center;"><spring:message code="Login.RecoveryEmailLabel"/></p>
                                <input type="email" name="recovery-email" id="recovery-email" class="form-control" autocomplete="off">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success"><spring:message code="Login.RecoveryButton"/></button>
                                <a href="#" class="btn btn-default btn-danger" data-dismiss="modal"><spring:message code="Login.RecoveryCancelButton"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </c:when>
            <c:otherwise>
                <div dir="${direction}" class="modal fade" id="userProfile" tabindex="-1" role="dialog" aria-labelledby="confirm" aria-hidden="true">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title"><spring:message code="UserProfile"/></h5>
                                <button type="button" class="close" style="padding-left: 0; margin-left: 0;" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row" style="text-align: center;">
                                    <label class="btn btn-primary btn-block"><i class="fas fa-list-ul"></i><spring:message code="Playlists"/>&nbsp;${fn:length(principal.playlists.toArray())}</label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-info"><spring:message code="Settings"/></button>
                                <form method="post" action="<c:url value="/logout"/>">
                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                    <input type="submit" class="btn btn-default btn-danger" value="<spring:message code="Logout"/>">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </c:otherwise>
        </c:choose>
        <audio id="audio1"></audio>
        <div id="loadFacebookG">
            <div id="blockG_1" class="facebook_blockG" style="background: rgb(0, 127, 246) !important;"></div>
            <div id="blockG_2" class="facebook_blockG" style="background: #FF9E47 !important;"></div>
            <div id="blockG_3" class="facebook_blockG" style="background: #229362 !important;"></div>
        </div>
    </div>
    <div class="dynamic">
        <div id="signupdialog" title="Info">
            <p>You have successfully signed up. You can login with your email Address now!</p>
        </div>
        <div id="mainContent">
            <h4>Trending this week on Beatify</h4>
            <div id="recipeCarousel" class="col-md-6 carousel slide w-100" data-ride="carousel">
                <div class="carousel-inner w-100" role="listbox">
                    <div class="carousel-item row no-gutters active">
                        <c:forEach items="${featuredAlbumsPart1}" var="album">
                            <div class="col-3 float-left">
                                <c:set var="albumCover" value="${album.albumArtURL}"/>
                                <a href="<c:url value="/albums/${album.id}"/>">
                                    <img class="img-fluid" data-target="${album.id}" style="cursor: pointer;"  src="${albumCover}">
                                </a>
                                <div id="songName">
                                    <span style="display: block;overflow: scroll;">${album.title}</span>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                    <div class="carousel-item row no-gutters">
                        <c:forEach items="${featuredAlbumsPart2}" var="album">
                            <div class="col-3 float-left">
                                <c:set var="albumCover" value="${album.albumArtURL}"/>
                                <a href="<c:url value="/albums/${album.id}"/>">
                                    <img class="img-fluid" data-target="${album.id}" style="cursor: pointer;"  src="${albumCover}">
                                </a>
                                <div id="songName">
                                    <span style="display: block;overflow: scroll;">${album.title}</span>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
                <a style="float: left;" class="carousel-prev" href="#recipeCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a style="float: right;" class="carousel-next" href="#recipeCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <h4 style="margin-top: 50px;">Recently Added to Beatify</h4>
            <div id="mostPlayedCarousel" class="col-md-6 carousel slide w-100" data-ride="carousel">
                <div class="carousel-inner w-100" role="listbox">
                    <div class="carousel-item row no-gutters active">
                        <c:forEach items="${recentlyAdded1}" var="album">
                            <div class="col-3 float-left">
                                <c:set var="albumCover" value="${album.albumArtURL}"/>
                                <a href="<c:url value="/albums/${album.id}"/>">
                                    <img class="img-fluid" data-target="${album.id}" style="cursor: pointer;"  src="${albumCover}">
                                </a>
                                <div id="songName">
                                    <span style="display: block;overflow: scroll;">${album.title}</span>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                    <div class="carousel-item row no-gutters">
                        <c:forEach items="${recentlyAdded2}" var="album">
                            <div class="col-3 float-left">
                                <c:set var="albumCover" value="${album.albumArtURL}"/>
                                <a href="<c:url value="/albums/${album.id}"/>">
                                    <img class="img-fluid" data-target="${album.id}" style="cursor: pointer;"  src="${albumCover}">
                                </a>
                                <div id="songName">
                                    <span style="display: block;overflow: scroll;">${album.title}</span>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
                <a style="float: left;" class="carousel-prev" href="#mostPlayedCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a style="float: right;" class="carousel-next" href="#mostPlayedCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    </div>
    <script type="text/javascript">

        $(function() {

            $("#signupdialog").dialog({

                autoOpen : false,
                closeText: "Close",
                resizable: false,
                draggable: false,
                modal : true,
                buttons: [
                    {
                        text: "Cool!",
                        click: function() {
                            $( this ).dialog("close");
                        }
                    },
                    {
                        text: "Login",
                        click: function() {

                            $(this).dialog("close");
                            $('#userlogin').trigger('click');
                        }
                    }
                ]
            });

            $('#loadFacebookG').css('display', 'none');

            $(document).on('pjax:send', function() {

                $('#loadFacebookG').css('display', 'block');
                $('.dynamic').css('display', 'none');
            });

            $(document).on('pjax:complete', function() {

                $(document).ready(function(){

                    $('#loadFacebookG').css('display', 'none');
                    $('.dynamic').css('display', 'block');
                });
            });
        });

    </script>
    </body>
</html>