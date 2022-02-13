<%--
  Created by IntelliJ IDEA.
  User: salarahmadi
  Date: 8/31/18
  Time: 19:54
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="sform" uri="http://www.springframework.org/tags/form" %>

<html>
    <head>
        <meta name="signupErrors" content="${errorsInSignup}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Cabin:500" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/login.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/styles.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/home.css"/>">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css"/>
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/niceselect/css/nice-select.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/plyr/dist/plyr.css"/>">
        <script   src="https://code.jquery.com/jquery-3.3.1.js"   integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="   crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.pjax/2.0.1/jquery.pjax.min.js"></script>
        <script src="<c:url value="/resources/niceselect/js/jquery.nice-select.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/loginscript.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/resources/js/beatify.js"/>"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js" type="text/javascript"></script>
        <script src="<c:url value="/resources/plyr/dist/plyr.min.js"/>"></script>
    </head>
    <body>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="navbar-brand">
                <a href="<c:url value="/home"/>">Beatify</a>
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
                        <a class="nav-link" href="<c:url value="/home/discover"/>">Discover<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<c:url value="/search"/>">Search</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About Us</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="modal fade" id="playlist" tabindex="-1" role="dialog" aria-labelledby="confirm" aria-hidden="true">
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
        <section id="login">
            <div class="container" style="margin-top: 50px;">
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-wrap" style="margin-top: 20px; text-align: center;">
                            <c:if test="${loginError}">
                            <div style="margin-left: auto; margin-right: auto;" class="alert alert-danger alert-dismissible">
                                Invalid Credentials
                                <a href="#" class="close" data-dismiss="alert" aria-label="Close">&times;</a>
                            </div>
                            </c:if>
                            <c:if test="${signupError}">
                                Signup has encountered a problem
                                <a href="#" class="close" data-dismiss="alert" aria-label="Close">&times;</a>
                            </c:if>
                            <c:if test="${logoutSuccess}">
                                <div style="margin-left: auto; margin-right: auto;" class="alert alert-success alert-dismissible">
                                    You have successfully logged out!
                                    <a href="#" class="close" data-dismiss="alert" aria-label="Close">&times;</a>
                                </div>
                            </c:if>
                            <ul class="nav nav-pills">
                                <li id="firstTab" class="nav-item nav-link">
                                    <a class="btn" data-toggle="tab" data-target="#tab1">Login</a>
                                </li>
                                <li id="secondTab" class="nav-item nav-link">
                                    <a class="btn" data-toggle="tab" data-target="#tab2">Sign up</a>
                                </li>
                            </ul>
                            <div class="tabbable">
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab1">
                                        <form role="form" action="<c:url value="/login"/>" method="post" style="text-align: center;" id="login-form" autocomplete="on">
                                            <div class="form-group">
                                                <label for="emailAddress" class="sr-only">Email Address</label>
                                                <input type="email" name="username" id="emailAddress"
                                                       class="form-control" placeholder="Your E-mail Address">
                                            </div>
                                            <div class="form-group">
                                                <label for="password" class="sr-only">Password</label>
                                                <input type="password" name="password" id="password"
                                                       class="form-control" placeholder="Your Password">
                                            </div>
                                            <div dir="ltr" class="pretty p-curve p-icon p-smooth" style="margin-bottom: 20px;">
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
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <sform:form method="post" action="http://localhost:8080/beatify-web/signup" modelAttribute="userDTO" id="login-form">
                                                        <sform:input path="username" id="usernameSignup"
                                                                     cssClass="form-control" type="email"
                                                                     placeholder="Your Email Addressِ"/>
                                                        <sform:errors path="username" cssClass="badge alert-danger" cssStyle="margin-top: 4px;"/>
                                                        <sform:input path="password" id="passwordSignup"
                                                                     cssClass="form-control" cssStyle="margin-top: 5px;"
                                                                     type="password" placeholder="Your Password"/>
                                                        <sform:errors path="password" cssClass="badge alert-danger" cssStyle="margin-top: 4px;"/>
                                                        <div class="row" style="margin-top: 5px; margin-bottom: 5px;">
                                                            <div class="col-md-6">
                                                                <sform:input path="firstName" id="firstName"
                                                                             cssClass="form-control"
                                                                             placeholder="First Name"/>
                                                                <sform:errors path="firstName" cssClass="badge alert-danger" cssStyle="margin-top: 4px;"/>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <sform:input path="lastName" id="lastName"
                                                                             cssClass="form-control"
                                                                             placeholder="Last Name"/>
                                                                <sform:errors path="lastName" cssClass="badge alert-danger" cssStyle="margin-top: 4px;"/>
                                                            </div>
                                                        </div>
                                                        <sform:input path="phoneNumber" id="phoneNumber" cssClass="form-control" type="text" placeholder="Phone Number"/>
                                                        <sform:select path="nationality" cssClass="wide"
                                                                      cssStyle="margin-bottom: 7px; margin-top: 5px;"
                                                                      title="Nationality">
                                                            <sform:option selected="true" disabled="true" value="0">Nationality</sform:option>
                                                            <c:forEach items="${countries}" var="country">
                                                                <sform:option value="${country}">${country}</sform:option>
                                                            </c:forEach>
                                                        </sform:select>
                                                        <div class="row col-md-12 btn" style="margin-top: 7px;margin-left: auto; margin-right: auto">
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
                            <a href="#" class="forget btn" data-toggle="modal" data-target="#forget">Forgot your
                                password?</a>
                            <div class="modal fade" id="forget" tabindex="-1" role="dialog" aria-labelledby="confirm"
                                 aria-hidden="true">
                                <div class="modal-dialog modal-sm">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Password Recovery</h5>
                                            <button type="button" class="close" style="padding-left: 0; margin-left: 0;" data-dismiss="modal">
                                                &times;
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <p style="text-align: center;">Recovery Email</p>
                                            <input type="email" name="recovery-email" id="recovery-email" class="form-control" autocomplete="off">
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-success">Recovery</button>
                                            <a href="#" class="btn btn-default btn-danger"
                                               data-dismiss="modal">Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer id="footer">
            <div class="container">
                <div class="row" style="display: inline;">
                    <div class="col-xs-12">
                        <p>Beatify © - 2018</p>
                    </div>
                </div>
            </div>
        </footer>
        <audio id="audio1"></audio>
    </body>
    <script type="text/javascript">

        $(function() {

            $('#firstName, #lastName, #passwordSignup').on('keypress', function(event) {

                var unicode = event.charCode ? event.charCode : event.keyCode;
                if (unicode < 0 || unicode > 127)
                    return false;
            });

            $('#phoneNumber').on('keypress', function(event){

                var unicode = event.charCode ? event.charCode : event.keyCode;
                if (unicode != 8 && (unicode < 48 || unicode > 57))
                    return false;
            });
        });

    </script>
</html>
