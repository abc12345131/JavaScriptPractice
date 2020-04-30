#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import logging; logging.basicConfig(level=logging.INFO)
import asyncio, os, json, time
from datetime import datetime
from aiohttp import web

routes = web.RouteTableDef()

@routes.get('/')
async def homepage(request):
    return web.Response(body=b'<h1>Baolong</h1>', content_type='text/html')

def init():
    app = web.Application()
    app.add_routes([web.get('/', homepage)])
    logging.info('server started at http://localhost:9000...')
    web.run_app(app, host='127.0.0.1', port=9000)


if __name__ == '__main__':
    init()