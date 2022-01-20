import os
import logging
import datetime
from config.config import LOG_PATH

now_time = datetime.datetime.now()

time_str = datetime.datetime.now().strftime('%Y-%m-%d')

fmt = '%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s: %(message)s'

logging.basicConfig(level=logging.ERROR,

                    format=fmt,

                    filename=(os.path.join(LOG_PATH, "{}")).format(time_str),

                    filemode='a',

                    datefmt='%a, %d %b %Y %H:%M:%S'

                    )