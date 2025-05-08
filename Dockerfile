# MIT License
#
# Copyright (c) 2024 uoohyo
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# Base Image
FROM ubuntu:22.04

# Code Composer Studio Version Variables
# <Major Version> . <Minor Version> . <Patch Version> . <Build Version>
# As of the last update to this project, the latest version of Code Composer Studio is "12.7.0.00007"


# Installable Product families Variables


# Adding support for i386 architecture
RUN dpkg --add-architecture i386

# Update package lists and upgrade packages
RUN apt-get update
RUN apt-get upgrade -y

# Install essential packages
RUN apt-get install -y libc6:i386
RUN apt-get install -y libusb-0.1-4:i386
RUN apt-get install -y libgconf-2-4:i386
RUN apt-get install -y libncurses5:i386
RUN apt-get install -y libtinfo5:i386
RUN apt-get install -y libpython2.7
RUN apt-get install -y build-essential
RUN apt-get install -y wget

# Clear APT cache to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory for CCS installation
WORKDIR /ccs_install

ARG MAJOR_VER
ARG MINOR_VER
ARG PATCH_VER
ARG BUILD_VER

# Download and extract CCS installation package
RUN wget -q https://software-dl.ti.com/ccs/esd/CCSv${MAJOR_VER}/CCS_${MAJOR_VER}_${MINOR_VER}_${PATCH_VER}/exports/CCS${MAJOR_VER}.${MINOR_VER}.${PATCH_VER}.${BUILD_VER}_linux-x64.tar.gz
RUN tar -zxvf CCS${MAJOR_VER}.${MINOR_VER}.${PATCH_VER}.${BUILD_VER}_linux-x64.tar.gz

ARG COMPONENTS

# Install CCS in unattended mode
RUN /ccs_install/CCS${MAJOR_VER}.${MINOR_VER}.${PATCH_VER}.${BUILD_VER}_linux-x64/ccs_setup_${MAJOR_VER}.${MINOR_VER}.${PATCH_VER}.${BUILD_VER}.run --mode unattended --enable-components ${COMPONENTS} --prefix /opt/ti --install-BlackHawk false --install-Segger false

# Clean up installation directory
RUN rm -r /ccs_install

# Set working directory to home
WORKDIR /home

# Update PATH environment variable
ENV PATH="/opt/ti/ccs/eclipse/:${PATH}"
