LIBPNG_VERSION ?= 1.6.37
LIBJPG_VERSION ?= 9c
OPENJP2_VERSION ?= 2.3.1
LIBTIFF_VERSION ?= 4.0.9
BZIP2_VERSION ?= 1.0.6
LIBWEBP_VERSION ?= 0.6.1
IMAGEMAGICK_VERSION ?= 7.0.8-45

TARGET_DIR ?= /opt/
PROJECT_ROOT = $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
CACHE_DIR=$(PROJECT_ROOT)build/cache

.ONESHELL:

CONFIGURE = PKG_CONFIG_PATH=$(CACHE_DIR)/lib/pkgconfig \
	./configure \
		CPPFLAGS=-I$(CACHE_DIR)/include \
		LDFLAGS=-L$(CACHE_DIR)/lib \
		--disable-dependency-tracking \
		--disable-shared \
		--enable-static \
		--prefix=$(CACHE_DIR)

## libjpg

LIBJPG_SOURCE=jpegsrc.v$(LIBJPG_VERSION).tar.gz

$(LIBJPG_SOURCE):
	curl -LO http://ijg.org/files/$(LIBJPG_SOURCE)

$(CACHE_DIR)/lib/libjpeg.a: $(LIBJPG_SOURCE)
	tar xf $<
	cd jpeg*
	$(CONFIGURE)	 
	make
	make install


## libpng

LIBPNG_SOURCE=libpng-$(LIBPNG_VERSION).tar.xz

$(LIBPNG_SOURCE):
	curl -LO http://prdownloads.sourceforge.net/libpng/$(LIBPNG_SOURCE)

$(CACHE_DIR)/lib/libpng.a: $(LIBPNG_SOURCE)
	tar xf $<
	cd libpng*
	$(CONFIGURE)	 
	make
	make install

# libbz2

BZIP2_SOURCE=bzip2-$(BZIP2_VERSION).tar.gz

$(BZIP2_SOURCE):
	curl -LO http://prdownloads.sourceforge.net/bzip2/bzip2-$(BZIP2_VERSION).tar.gz

$(CACHE_DIR)/lib/libbz2.a: $(BZIP2_SOURCE)
	tar xf $<
	cd bzip2-*
	make libbz2.a
	make install PREFIX=$(CACHE_DIR)

# libtiff

LIBTIFF_SOURCE=tiff-$(LIBTIFF_VERSION).tar.gz

$(LIBTIFF_SOURCE):
	curl -LO http://download.osgeo.org/libtiff/$(LIBTIFF_SOURCE)

$(CACHE_DIR)/lib/libtiff.a: $(LIBTIFF_SOURCE) $(CACHE_DIR)/lib/libjpeg.a
	tar xf $<
	cd tiff-*
	$(CONFIGURE)	 
	make
	make install

# libwebp

LIBWEBP_SOURCE=libwebp-$(LIBWEBP_VERSION).tar.gz

$(LIBWEBP_SOURCE):
	curl -L https://github.com/webmproject/libwebp/archive/v$(LIBWEBP_VERSION).tar.gz -o $(LIBWEBP_SOURCE)
	
$(CACHE_DIR)/lib/libwebp.a: $(LIBWEBP_SOURCE)
	tar xf $<
	cd libwebp-*
	sh autogen.sh
	$(CONFIGURE)	 
	make
	make install

## libopenjp2

OPENJP2_SOURCE=openjp2-$(OPENJP2_VERSION).tar.gz

$(OPENJP2_SOURCE):
	curl -L https://github.com/uclouvain/openjpeg/archive/v$(OPENJP2_VERSION).tar.gz -o $(OPENJP2_SOURCE)


$(CACHE_DIR)/lib/libopenjp2.a: $(OPENJP2_SOURCE) $(CACHE_DIR)/lib/libpng.a $(CACHE_DIR)/lib/libtiff.a
	tar xf $<
	cd openjpeg-*
	mkdir -p build
	cd build 
	PKG_CONFIG_PATH=$(CACHE_DIR)/lib/pkgconfig cmake .. \
		-DCMAKE_BUILD_TYPE=Release \
		-DCMAKE_INSTALL_PREFIX=$(CACHE_DIR) \
		-DBUILD_SHARED_LIBS:bool=off \
		-DBUILD_CODEC:bool=off
	make clean
	make install


## ImageMagick

IMAGE_MAGICK_SOURCE=ImageMagick-$(IMAGEMAGICK_VERSION).tar.gz

$(IMAGE_MAGICK_SOURCE):
	curl -L https://github.com/ImageMagick/ImageMagick/archive/refs/tags/$(IMAGEMAGICK_VERSION).tar.gz -o $(IMAGE_MAGICK_SOURCE)


LIBS:=$(CACHE_DIR)/lib/libjpeg.a \
	$(CACHE_DIR)/lib/libpng.a \
	$(CACHE_DIR)/lib/libopenjp2.a \
	$(CACHE_DIR)/lib/libtiff.a \
	$(CACHE_DIR)/lib/libbz2.a \
	$(CACHE_DIR)/lib/libwebp.a

$(TARGET_DIR)/bin/identify: $(IMAGE_MAGICK_SOURCE) $(LIBS)
	tar xf $<
	cd ImageMa*
	PKG_CONFIG_PATH=$(CACHE_DIR)/lib/pkgconfig \
		./configure \
		CPPFLAGS=-I$(CACHE_DIR)/include \
		LDFLAGS=-L$(CACHE_DIR)/lib \
		--disable-dependency-tracking \
		--disable-shared \
		--enable-static \
		--prefix=$(TARGET_DIR) \
		--enable-delegate-build \
		--without-modules \
		--disable-docs \
		--without-magick-plus-plus \
		--without-perl \
		--without-x \
		--disable-openmp
	make clean
	make all
	make install-strip

libs: $(LIBS)

all: $(TARGET_DIR)/bin/identify