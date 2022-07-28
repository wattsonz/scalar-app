import React, { ReactElement } from 'react'
import footer from '../styles/footer.module.css'
import '../styles/footer.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'

type Props = {}

export default function Footer({ }: Props): ReactElement {
    return (
        <>
            <div>
                {/* Banner */}
                <div className="container-fluid flex-grow-1 flex-shrink-0">
                    <div className="px-lg-5">
                        <div className="row py-5">
                            <div className={`col-lg-12 mx-auto text-white  text-center ${footer.div}`}>
                                <h1 className="display-4">KSM Shop</h1>
                                <p className="lead mb-0">Build a nicely styled keyboard.</p>
                                <p className="lead">Powered by <a href="https://bootstrapious.com/snippets" className="text-white">
                                    <u>Treasure X</u></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Banner */}

                {/* Footer */}
                <div className='container mx-auto px-40'>
                    <footer className="bg-white">
                        <div className="container py-5">
                            <div className="row py-4">
                                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0"><img src="/imgs/logo.png" alt="logo" width={180} className="mb-3 " />
                                    <p className="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                                    <ul className="list-inline mt-4">
                                        <li className="list-inline-item"><a href="#" target="_blank" title="twitter"><i className={`fa fa-twitter ${footer.i}`} /></a></li>
                                        <li className="list-inline-item"><a href="#" target="_blank" title="facebook"><i className={`fa fa-facebook ${footer.i}`} /></a></li>
                                        <li className="list-inline-item"><a href="#" target="_blank" title="instagram"><i className={`fa fa-instagram ${footer.i}`} /></a></li>
                                        <li className="list-inline-item"><a href="#" target="_blank" title="pinterest"><i className={`fa fa-pinterest ${footer.i}`} /></a></li>
                                        <li className="list-inline-item"><a href="#" target="_blank" title="vimeo"><i className={`fa fa-vimeo ${footer.i}`} /></a></li>
                                    </ul>
                                </div>
                                <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                                    <h6 className="text-uppercase font-weight-bold mb-4">Categories</h6>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2"><a href="#" className="text-muted">Keyboards</a></li>
                                        <li className="mb-2"><a href="#" className="text-muted">Accessories</a></li>
                                    </ul>
                                </div>
                                <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                                    <h6 className="text-uppercase font-weight-bold mb-4">Contact</h6>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2"><a href="#" className="text-muted">Facebook</a></li>
                                        <li className="mb-2"><a href="#" className="text-muted">Instagram</a></li>
                                    </ul>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-lg-0">
                                    <h6 className="text-uppercase font-weight-bold mb-4">Subcribe here!</h6>
                                    <p className="text-muted mb-4">Leave your email address to receive our promotion news and brand new products</p>
                                    <div className="p-1 rounded border">
                                        <div className="input-group">
                                            <input type="email" placeholder="Enter your email address" aria-describedby="button-addon1" className="form-control border-0 shadow-0" />
                                            <div className="input-group-append">
                                                <button id="button-addon1" type="submit" className="btn btn-link"><i className={`fa fa-paper-plane ${footer.i}`} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                {/* Footer */}
                {/* Copyrights */}
                <div className="bg-light py-4">
                    <div className="container text-center">
                        <p className="text-muted mb-0 py-2">© 2022 Treasure X All rights reserved.</p>
                    </div>
                </div>
                {/* Copyrights */}
            </div>
        </>
    )
}