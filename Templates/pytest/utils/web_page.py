import os
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver import ActionChains
from config.config import IMAGE_PATH, CHROMEDRIVER_PATH, URL
from datetime import datetime
from pywinauto import Desktop
import time

#Chrome option
option = webdriver.ChromeOptions()
headers = { 
            #copy chrome header here，if cookie needed copy as well
          }
option.add_argument('headers={}'.format(headers))
#incognito，max the window
#option.add_argument('--incognito --start-maximized')
#use VPN
#option.add_argument('--proxy-server=http://user:password@proxy.com:8080')
#selenium open Chrome
driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH, options=option)
driver.get(URL)
class WebPageTest(object):

    def __init__(self, env_dict, driver):
        self.driver = driver
        self.env_dict = env_dict

    def find(self, locator):
        try:
            e = self.driver.find_element(*locator)
        except Exception as err:
            logging.error(f"Fail to locate：{err}")
            self.save_screenshot()
        else:
            return e

    def save_screenshot(self):
        # name with datetime
        ts_str = datetime.now().strftime("%y-%m_%d-%H-%M-%S")
        file_name = os.path.join(IMAGE_PATH, ts_str) + '.png'
        self.driver.save_screenshot(file_name)
        return self

    def find_and_red(self, locator):
        #locate element and color it red
        try:
            e = self.driver.find_element(*locator)
            js_code = "arguments[0].style.borderColor='red';"
            self.driver.execute_script(js_code, e)
        except Exception as err:
            logging.error(f"Fail to locate：{err}")
            self.save_screenshot()
        else:
            return e

    def wait_element_clickable(self, locator, timeout=20, poll_frequency=0.2):
        wait = WebDriverWait(self.driver, timeout, poll_frequency)
        try:
            e = wait.until(expected_conditions.element_to_be_clickable(locator))
        except Exception as err:
            logging.error(f"Fail to locate：{err}")
            self.save_screenshot()
        else:
            return e

    def wait_element_visible(self, locator, timeout=20, poll_frequency=0.2):
        wait = WebDriverWait(self.driver, timeout, poll_frequency)
        try:
            e = wait.until(expected_conditions.visibility_of_element_located(locator))
        except Exception as err:
            logging.error(f"Fail to locate：{err}")
            self.save_screenshot()
        else:
            return e

    def wait_element_present(self, locator, timeout=20, poll_frequency=0.2):
        wait = WebDriverWait(self.driver, timeout, poll_frequency)
        try:
            e = wait.until(expected_conditions.presence_of_element_located(locator))
        except Exception as err:
            logging.error(f"Fail to locate：{err}")
            self.save_screenshot()
        else:
            return e

    def click_element(self, locator):
        e = self.wait_element_clickable(locator)
        e.click()
        return self

    def double_click(self, locator):
        e = self.wait_element_clickable(locator)
        ac = ActionChains(self.driver)
        ac.double_click(e).perform()
        return self

    def move_to(self, locator):
        e = self.find(locator)
        ac = ActionChains(self.driver)
        ac.move_to_element(e).perform()
        return self

    def switch_to_frame(self, e, wait=False):
        if not wait:
            self.driver.switch_to.frame(e)
            return self
        wait = WebDriverWait(self.driver, 30)
        wait.until(expected_conditions.frame_to_be_available_and_switch_to_it(e))
        return self

    def add_file(self, file_path):
        app = Desktop()
        dialog = app['open']
        time.sleep(2)
        dialog["Edit"].type_keys(file_path)
        dialog["Button"].click()

    def clear_input_box(self, locator):
        input_box = self.find(locator)
        try:
            input_box.clear()
        except Exception as err:
            logging.error(f"Fail to clear：{err}")
        finally:
            return input_box
